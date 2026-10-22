"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { SceneColors } from "./palette";

// Pikes Peak at dawn: layered procedural ridges with mist between them.
// Scroll progress (0..1) flies the camera forward and up through the layers,
// then fades everything to the page colour so the hero dissolves into the
// first light section.

const CAM_START_Z = 14;
const CAM_END_Z = -16;

// Deterministic value noise so the range looks the same on every load.
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}
function noise1(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}
function fbm(x: number, octaves = 5) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let o = 0; o < octaves; o++) {
    v += a * (noise1(x * f) * 2 - 1);
    f *= 2.03;
    a *= 0.5;
  }
  return v;
}

type Layer = {
  z: number;
  base: number;
  amp: number;
  freq: number;
  seed: number;
  pikes?: boolean;
  pines?: number;
};

const LAYERS: Layer[] = [
  { z: -78, base: 3.2, amp: 3, freq: 0.05, seed: 11, pikes: true },
  { z: -58, base: 2.6, amp: 3.6, freq: 0.07, seed: 23 },
  { z: -42, base: 1.6, amp: 3, freq: 0.09, seed: 37 },
  { z: -29, base: 0.6, amp: 2.4, freq: 0.12, seed: 51, pines: 80 },
  { z: -17, base: -0.2, amp: 1.9, freq: 0.16, seed: 67, pines: 100 },
  { z: -6, base: -0.9, amp: 1.4, freq: 0.22, seed: 83, pines: 70 },
];

// Pikes Peak seen from the east: a broad massif with a rounded summit and a
// long northern shoulder, sitting a little right of centre.
function pikesProfile(x: number) {
  const summit = 15 * Math.exp(-Math.pow((x - 8) / 13, 2));
  const shoulder = 6 * Math.exp(-Math.pow((x - 26) / 14, 2));
  const southRange = 5 * Math.exp(-Math.pow((x + 22) / 16, 2));
  return Math.max(summit, shoulder * 0.9 + summit * 0.3) + southRange;
}

function ridgeHeight(layer: Layer, x: number) {
  let h = layer.base + layer.amp * fbm(x * layer.freq + layer.seed);
  if (layer.pikes) h += pikesProfile(x) + 0.6 * fbm(x * 0.35 + 5, 3);
  return h;
}

function layerWidth(z: number) {
  return (CAM_START_Z - z) * 1.7 + 50;
}

function useRidgeGeometry(layer: Layer, colors: SceneColors, depthT: number) {
  return useMemo(() => {
    const width = layerWidth(layer.z);
    const segments = layer.pikes ? 260 : 180;
    const bottom = -40;
    const base = new THREE.Color(colors.ridgeFar).lerp(new THREE.Color(colors.ridgeNear), depthT);
    const rim = base.clone().lerp(new THREE.Color(colors.rim), layer.pikes ? 0.32 : 0.07 * (1 - depthT) + 0.03);
    const snow = new THREE.Color(colors.rim).lerp(new THREE.Color("#ffffff"), 0.4);
    const deep = base.clone().multiplyScalar(0.82);

    const positions: number[] = [];
    const colorsArr: number[] = [];
    const indices: number[] = [];
    // Three rows per column: crest (rim light), just below crest, bottom.
    for (let i = 0; i <= segments; i++) {
      const x = -width / 2 + (i / segments) * width;
      const h = ridgeHeight(layer, x);
      const band = layer.pikes ? 1.1 : 0.45;
      positions.push(x, h, 0, x, h - band, 0, x, bottom, 0);
      const crest = layer.pikes && h > 12 ? snow : rim;
      colorsArr.push(crest.r, crest.g, crest.b, base.r, base.g, base.b, deep.r, deep.g, deep.b);
      if (i < segments) {
        const a = i * 3;
        const b = (i + 1) * 3;
        indices.push(a, a + 1, b, b, a + 1, b + 1, a + 1, a + 2, b + 1, b + 1, a + 2, b + 2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colorsArr, 3));
    geo.setIndex(indices);
    return { geo, base };
  }, [layer, colors, depthT]);
}

function Pines({ layer, color }: { layer: Layer; color: THREE.Color }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = layer.pines ?? 0;
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.5, 0);
    s.lineTo(0, 1.9);
    s.lineTo(0.5, 0);
    s.lineTo(-0.5, 0);
    return new THREE.ShapeGeometry(s);
  }, []);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const width = layerWidth(layer.z) * 0.9;
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      const x = -width / 2 + hash(i * 7.3 + layer.seed) * width;
      const s = 0.25 + hash(i * 3.1 + layer.seed) * 0.35 * (1 + (layer.z + 30) / 30);
      const y = ridgeHeight(layer, x) - 0.35;
      m.makeScale(s, s * (0.9 + hash(i) * 0.6), 1);
      m.setPosition(x, y, 0.01);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [layer, count]);
  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]}>
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

function Ridge({ layer, colors, index }: { layer: Layer; colors: SceneColors; index: number }) {
  const depthT = Math.pow(index / (LAYERS.length - 1), 0.85);
  const { geo, base } = useRidgeGeometry(layer, colors, depthT);
  return (
    <group position={[0, 0, layer.z]}>
      <mesh geometry={geo}>
        <meshBasicMaterial vertexColors />
      </mesh>
      {layer.pines ? <Pines layer={layer} color={base} /> : null}
    </group>
  );
}

// Soft cloud texture drawn once on a canvas.
function useMistTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 256;
    const g = c.getContext("2d")!;
    for (let i = 0; i < 46; i++) {
      const x = hash(i * 1.7) * 1024;
      const y = 112 + hash(i * 2.9) * 32;
      const r = 40 + hash(i * 5.1) * 70;
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, "rgba(255,255,255,0.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(x - r, y - r, r * 2, r * 2);
      // Wrap horizontally so the drifting texture tiles without a seam.
      for (const dx of [-1024, 1024]) {
        const g2 = g.createRadialGradient(x + dx, y, 0, x + dx, y, r);
        g2.addColorStop(0, "rgba(255,255,255,0.55)");
        g2.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = g2;
        g.fillRect(x + dx - r, y - r, r * 2, r * 2);
      }
    }
    // Fade top and bottom so plane edges never show.
    g.globalCompositeOperation = "destination-in";
    const v = g.createLinearGradient(0, 0, 0, 256);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(0.4, "rgba(0,0,0,1)");
    v.addColorStop(0.65, "rgba(0,0,0,1)");
    v.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = v;
    g.fillRect(0, 0, 1024, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const MIST = [
  { z: -68, y: 4.0, h: 12, speed: 0.004, opacity: 0.4 },
  { z: -50, y: 2.4, h: 9, speed: 0.006, opacity: 0.32 },
  { z: -35, y: 1.2, h: 7, speed: 0.008, opacity: 0.28 },
  { z: -23, y: 0.3, h: 6, speed: 0.01, opacity: 0.24 },
  { z: -12, y: -0.5, h: 5, speed: 0.013, opacity: 0.2 },
  { z: 3, y: 0.4, h: 5, speed: 0.016, opacity: 0.18 },
];

function Mist({ color }: { color: string }) {
  const base = useMistTexture();
  const textures = useMemo(
    () =>
      MIST.map((_, i) => {
        const t = base.clone();
        t.offset.x = hash(i * 9.1);
        t.needsUpdate = true;
        return t;
      }),
    [base],
  );
  useFrame((_, dt) => {
    textures.forEach((t, i) => (t.offset.x += MIST[i].speed * dt));
  });
  return (
    <>
      {MIST.map((m, i) => (
        <mesh key={i} position={[0, m.y, m.z]}>
          <planeGeometry args={[layerWidth(m.z), m.h]} />
          <meshBasicMaterial map={textures[i]} color={color} transparent opacity={m.opacity} depthWrite={false} fog={false} />
        </mesh>
      ))}
    </>
  );
}

const skyVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const skyFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uMid;
  uniform vec3 uGlow;
  uniform vec3 uEnd;
  uniform float uFade;
  uniform float uSun;
  varying vec2 vUv;
  void main() {
    vec3 col = mix(uHorizon, uMid, smoothstep(0.40, 0.52, vUv.y));
    col = mix(col, uTop, smoothstep(0.50, 0.68, vUv.y));
    vec2 sunPos = vec2(0.6, 0.47 + uSun * 0.03);
    float d = distance(vec2(vUv.x * 2.2, vUv.y), vec2(sunPos.x * 2.2, sunPos.y));
    col = mix(col, uGlow, clamp(exp(-d * 10.0) * 0.85 + exp(-d * 3.2) * 0.25, 0.0, 1.0) * (0.7 + uSun * 0.3));
    gl_FragColor = vec4(mix(col, uEnd, uFade), 1.0);
  }
`;

function Rig({ progress, colors, onReady }: { progress: MotionValue<number>; colors: SceneColors; onReady?: () => void }) {
  const smooth = useRef<number | null>(null);
  const skyRef = useRef<THREE.ShaderMaterial>(null);
  const ready = useRef(false);

  const fogColor = useMemo(() => new THREE.Color(colors.fog), [colors.fog]);
  const endColor = useMemo(() => new THREE.Color(colors.end), [colors.end]);
  const tmp = useMemo(() => new THREE.Color(), []);

  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color(colors.skyTop) },
      uHorizon: { value: new THREE.Color(colors.skyHorizon) },
      uMid: { value: new THREE.Color(colors.skyMid) },
      uGlow: { value: new THREE.Color(colors.glow) },
      uEnd: { value: new THREE.Color(colors.end) },
      uFade: { value: 0 },
      uSun: { value: 0 },
    }),
    [colors],
  );

  useFrame((state, dt) => {
    const { camera, scene } = state;
    const prev = smooth.current ?? progress.get();
    const p = prev + (progress.get() - prev) * Math.min(1, dt * 3.2);
    smooth.current = p;
    const ease = p * p * (3 - 2 * p);
    camera.position.z = CAM_START_Z + (CAM_END_Z - CAM_START_Z) * ease;
    camera.position.y = 1.4 + ease * 3.2;
    // On portrait screens, aim at the summit, which sits right of centre.
    const bias = state.size.width < state.size.height ? 3.2 : 0;
    camera.position.x += (bias + state.pointer.x * 1.2 - camera.position.x) * Math.min(1, dt * 1.5);
    camera.lookAt(bias * 1.6 + (camera.position.x - bias) * 0.3, camera.position.y + 0.9 - ease * 1.4 + state.pointer.y * 0.4, camera.position.z - 40);

    const fade = THREE.MathUtils.smoothstep(p, 0.68, 0.98);
    const fog = scene.fog as THREE.Fog | null;
    if (fog) {
      fog.color.copy(tmp.copy(fogColor).lerp(endColor, fade));
      fog.near = 40 * (1 - fade);
      fog.far = 280 - 268 * fade;
    }
    if (skyRef.current) {
      skyRef.current.uniforms.uFade.value = fade;
      skyRef.current.uniforms.uSun.value = p;
    }
    if (!ready.current) {
      ready.current = true;
      onReady?.();
    }
  });

  return (
    <>
      <fog attach="fog" args={[colors.fog, 40, 280]} />
      <mesh position={[0, 20, -95]}>
      <planeGeometry args={[420, 170]} />
        <shaderMaterial ref={skyRef} vertexShader={skyVertex} fragmentShader={skyFragment} uniforms={uniforms} depthWrite={false} fog={false} />
      </mesh>
    </>
  );
}

export default function PeakScene({
  progress,
  colors,
  active,
  onReady,
}: {
  progress: MotionValue<number>;
  colors: SceneColors;
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, near: 0.1, far: 300, position: [0, 1.4, CAM_START_Z] }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Rig progress={progress} colors={colors} onReady={onReady} />
      {LAYERS.map((l, i) => (
        <Ridge key={`${l.z}-${colors.end}`} layer={l} colors={colors} index={i} />
      ))}
      <Mist color={colors.mist} />
    </Canvas>
  );
}
