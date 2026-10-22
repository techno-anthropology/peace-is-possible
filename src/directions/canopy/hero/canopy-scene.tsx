"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { Palette } from "@/components/shared/prototype";

// Light falling through a forest canopy, seen from the forest floor.
// Everything is procedural (canvas-drawn leaf atlases + small shaders) so the
// scene ships no model or texture downloads.

type Tone = {
  glow: string;
  mid: string;
  base: string;
  layers: [string, string, string, string];
  ray: string;
  rayBlend: THREE.Blending;
  rayStrength: number;
  fall: string[];
  mote: string;
};

const tones: Record<Palette, Tone> = {
  forest: {
    glow: "#fff3cf",
    mid: "#1f4630",
    base: "#07120d",
    layers: ["#3f6d4c", "#21452f", "#123222", "#06150d"],
    ray: "#fff1c4",
    rayBlend: THREE.AdditiveBlending,
    rayStrength: 0.22,
    fall: ["#4f8a5c", "#6aa36f", "#c9b35a", "#2f6b45"],
    mote: "#fff6d8",
  },
  sage: {
    glow: "#ffffff",
    mid: "#c3d9c0",
    base: "#dde8da",
    layers: ["#a9c7a9", "#86ad89", "#5f8d68", "#3d6a4a"],
    ray: "#ffffff",
    rayBlend: THREE.NormalBlending,
    rayStrength: 0.32,
    fall: ["#6f9d75", "#8db58e", "#c2b56a", "#557f5d"],
    mote: "#ffffff",
  },
  dawn: {
    glow: "#ffdcaa",
    mid: "#35593f",
    base: "#0c1c16",
    layers: ["#4a6e4f", "#2a4a34", "#163526", "#0a1912"],
    ray: "#ffd9a6",
    rayBlend: THREE.AdditiveBlending,
    rayStrength: 0.24,
    fall: ["#5c8f5f", "#7fa86c", "#d6a95e", "#3a6b47"],
    mote: "#ffe9c9",
  },
};

// Sun gap in the canopy, in normalized screen space (0..1, y up).
const SUN = new THREE.Vector2(0.64, 0.86);

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function leafPath(ctx: CanvasRenderingContext2D, len: number, width: number) {
  ctx.beginPath();
  ctx.moveTo(0, -len);
  ctx.quadraticCurveTo(width, -len * 0.1, 0, len);
  ctx.quadraticCurveTo(-width, -len * 0.1, 0, -len);
  ctx.fill();
}

// Draws one canopy layer: leaf clusters on branches, dense at the edges and
// thinning toward the sun gap.
function makeCanopyTexture(seed: number, density: number, leafScale: number, blur: number) {
  const size = 1536;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = rng(seed);
  const gapX = SUN.x * size;
  const gapY = (1 - SUN.y) * size;

  const openness = (x: number, y: number) => {
    const d = Math.hypot((x - gapX) / size, (y - gapY) / size * 1.15);
    // 0 inside the gap, 1 far from it; lower half of the frame stays mostly clear.
    const fromGap = Math.min(1, Math.max(0, (d - 0.16) / 0.42));
    const lowFade = y > size * 0.62 ? Math.max(0, 1 - (y - size * 0.62) / (size * 0.3)) : 1;
    const edge = Math.max(Math.abs(x / size - 0.5) * 2, 0) ** 2.2;
    return Math.min(1, fromGap * lowFade + edge * 0.9);
  };

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";

  const clusters = Math.round(70 * density);
  for (let c = 0; c < clusters; c++) {
    let x = 0;
    let y = 0;
    let placed = false;
    for (let tries = 0; tries < 40 && !placed; tries++) {
      x = r() * size;
      y = r() * size;
      placed = r() < openness(x, y) ** 1.6;
    }
    if (!placed) continue;
    // A branch reaching toward the cluster from the nearest edge.
    // Short branch coming in from the outer side of the cluster.
    const fromLeft = x < gapX;
    const reach = 140 + r() * 220;
    const bx = x + (fromLeft ? -reach : reach);
    const by = y + (y < gapY ? -1 : 1) * (40 + r() * 120);
    // Tapered: thick near the trunk side, thin at the cluster.
    const cx = (bx + x) / 2;
    const cy = by - 60 + r() * 120;
    const base = (2 + r() * 4) * leafScale;
    for (let k = 0; k < 6; k++) {
      ctx.lineWidth = base * (1 - k / 7);
      const t0 = k / 6;
      const t1 = (k + 1) / 6;
      const q = (t: number) => [
        (1 - t) ** 2 * bx + 2 * (1 - t) * t * cx + t * t * x,
        (1 - t) ** 2 * by + 2 * (1 - t) * t * cy + t * t * y,
      ];
      const [ax, ay] = q(t0);
      const [ex, ey] = q(t1);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }

    const leaves = 18 + Math.floor(r() * 26);
    const spread = (30 + r() * 55) * leafScale;
    for (let i = 0; i < leaves; i++) {
      const a = r() * Math.PI * 2;
      const dist = Math.sqrt(r()) * spread;
      const lx = x + Math.cos(a) * dist;
      const ly = y + Math.sin(a) * dist;
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(a + Math.PI / 2 + (r() - 0.5) * 0.9);
      ctx.globalAlpha = 0.82 + r() * 0.18;
      const len = (7 + r() * 8) * leafScale;
      leafPath(ctx, len, len * (0.45 + r() * 0.25));
      ctx.restore();
    }
  }
  // Near layers are out of focus, like a camera looking past them. One blur
  // pass over the finished layer; filtering each leaf draw is far too slow.
  let out = canvas;
  if (blur) {
    out = document.createElement("canvas");
    out.width = out.height = size;
    const octx = out.getContext("2d")!;
    octx.filter = `blur(${blur}px)`;
    octx.drawImage(canvas, 0, 0);
  }
  const tex = new THREE.CanvasTexture(out);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeLeafSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(32, 48);
  ctx.fillStyle = "#fff";
  leafPath(ctx, 44, 22);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(0, 44);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeDot() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

const CAM_Z = 10;
const FOV = 50;
// World-space size of the visible frame at depth z.
function frameAt(z: number, aspect: number) {
  const h = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * (CAM_Z - z);
  return { w: h * aspect, h };
}

function Backdrop({ tone }: { tone: Tone }) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const z = -14;
  const f = frameAt(z, aspect);
  const uniforms = useMemo(
    () => ({
      uGlow: { value: new THREE.Color() },
      uMid: { value: new THREE.Color() },
      uBase: { value: new THREE.Color() },
      uSun: { value: SUN.clone() },
      uAspect: { value: 1 },
      uTime: { value: 0 },
    }),
    [],
  );
  const mat = useRef<THREE.ShaderMaterial>(null);
  // Uniforms are mutated through the material ref, inside the frame loop.
  useFrame((_, dt) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uGlow.value.set(tone.glow);
    u.uMid.value.set(tone.mid);
    u.uBase.value.set(tone.base);
    u.uAspect.value = aspect;
    u.uTime.value += dt;
  });

  return (
    <mesh position={[0, 0, z]} scale={[f.w * 1.3, f.h * 1.3, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={mat}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform vec3 uGlow; uniform vec3 uMid; uniform vec3 uBase; uniform vec2 uSun; uniform float uAspect; uniform float uTime;
          varying vec2 vUv;
          void main(){
            vec2 uv = (vUv - 0.5) / 1.3 + 0.5;
            vec3 col = mix(uBase, uMid, smoothstep(0.05, 0.95, uv.y));
            vec2 d = (uv - uSun) * vec2(uAspect, 1.0);
            float glow = exp(-dot(d, d) * 11.0) * (0.92 + 0.08 * sin(uTime * 0.35));
            float halo = exp(-dot(d, d) * 2.6) * 0.28;
            col = mix(col, uGlow, clamp(glow + halo, 0.0, 1.0));
            gl_FragColor = vec4(col, 1.0);
            #include <colorspace_fragment>
          }`}
      />
    </mesh>
  );
}

const LAYERS = [
  { z: -9, seed: 11, density: 4.2, leaf: 1.1, blur: 1.5, sway: 0.004, parallax: 0.05 },
  { z: -5, seed: 23, density: 3.0, leaf: 1.3, blur: 0, sway: 0.006, parallax: 0.12 },
  { z: -1.5, seed: 37, density: 1.8, leaf: 1.6, blur: 0, sway: 0.008, parallax: 0.22 },
  { z: 3.5, seed: 51, density: 0.7, leaf: 2.4, blur: 7, sway: 0.011, parallax: 0.38 },
];

function CanopyLayers({ tone, progress }: { tone: Tone; progress: MotionValue<number> }) {
  const textures = useMemo(() => LAYERS.map((l) => makeCanopyTexture(l.seed, l.density, l.leaf, l.blur)), []);
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const { size } = useThree();
  const aspect = size.width / size.height;

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    const p = progress.get();
    refs.current.forEach((m, i) => {
      if (!m) return;
      const l = LAYERS[i];
      m.rotation.z = Math.sin(t * 0.18 + i * 1.7) * l.sway * 6;
      m.position.x = THREE.MathUtils.lerp(m.position.x, -pointer.x * l.parallax, 0.03);
      // Scrolling lifts the near layers away, as if you were stepping into the clearing.
      m.position.y = THREE.MathUtils.lerp(m.position.y, -pointer.y * l.parallax * 0.6 + p * (i + 1) * 0.35, 0.05);
    });
  });

  return (
    <>
      {LAYERS.map((l, i) => {
        const f = frameAt(l.z, aspect);
        const s = Math.max(f.w, f.h) * 1.12;
        return (
          <mesh key={l.seed} ref={(m) => void (refs.current[i] = m)} position={[0, 0, l.z]} scale={[s, s, 1]} renderOrder={i + 1}>
            <planeGeometry />
            <meshBasicMaterial map={textures[i]} color={tone.layers[i]} transparent depthWrite={false} toneMapped={false} />
          </mesh>
        );
      })}
    </>
  );
}

const RAYS = [
  { angle: -0.34, width: 1.6, phase: 0 },
  { angle: -0.2, width: 0.9, phase: 1.3 },
  { angle: -0.07, width: 2.2, phase: 2.1 },
  { angle: 0.08, width: 1.1, phase: 3.4 },
  { angle: 0.2, width: 1.7, phase: 4.2 },
  { angle: 0.33, width: 0.8, phase: 5.1 },
];

function GodRays({ tone }: { tone: Tone }) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const z = 0.5;
  const f = frameAt(z, aspect);
  const sunX = (SUN.x - 0.5) * f.w;
  const sunY = (SUN.y - 0.5) * f.h;
  const mats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const length = f.h * 1.2;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mats.current.forEach((m, i) => {
      if (m) m.uniforms.uOpacity.value = tone.rayStrength * (0.55 + 0.45 * Math.sin(t * 0.22 + RAYS[i].phase));
    });
  });

  return (
    <group position={[sunX, sunY, z]} rotation={[0, 0, -0.3]}>
      {RAYS.map((r, i) => (
        <group key={i} rotation={[0, 0, r.angle]}>
        <mesh position={[0, -length / 2, i * 0.05]} renderOrder={4.5}>
          <planeGeometry args={[r.width, length]} />
          <shaderMaterial
            ref={(m) => void (mats.current[i] = m)}
            transparent
            depthWrite={false}
            blending={tone.rayBlend}
            uniforms={{ uColor: { value: new THREE.Color(tone.ray) }, uOpacity: { value: tone.rayStrength } }}
            vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
            fragmentShader={`
              uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv;
              void main(){
                float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
                float a = pow(across, 2.2) * smoothstep(0.0, 0.55, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
                gl_FragColor = vec4(uColor, a * uOpacity);
                #include <colorspace_fragment>
              }`}
          />
        </mesh>
        </group>
      ))}
    </group>
  );
}

const FALL_COUNT = 34;

function FallingLeaves({ tone, progress }: { tone: Tone; progress: MotionValue<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const sprite = useMemo(() => makeLeafSprite(), []);
  useEffect(() => () => sprite.dispose(), [sprite]);
  const { size } = useThree();
  const aspect = size.width / size.height;
  const f = frameAt(0, aspect);

  const seeds = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: FALL_COUNT }, () => ({
      x: (r() - 0.5),
      y: r(),
      z: -4 + r() * 8,
      speed: 0.12 + r() * 0.16,
      sway: 0.3 + r() * 0.6,
      spin: 0.3 + r() * 0.8,
      phase: r() * Math.PI * 2,
      scale: 0.16 + r() * 0.16,
      color: Math.floor(r() * 4),
    }));
  }, []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const c = new THREE.Color();
    seeds.forEach((s, i) => m.setColorAt(i, c.set(tone.fall[s.color])));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [seeds, tone]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime;
    const p = progress.get();
    const span = f.h * 1.3;
    seeds.forEach((s, i) => {
      // Fall position wraps; scrolling nudges leaves further down.
      const y = span / 2 - (((s.y * span + t * s.speed + p * 2.2) % span) + span) % span;
      dummy.position.set(s.x * f.w * 1.2 + Math.sin(t * s.sway + s.phase) * 0.6, y, s.z);
      dummy.rotation.set(Math.sin(t * s.spin + s.phase) * 1.1, t * s.spin * 0.5 + s.phase, Math.cos(t * s.sway + s.phase) * 0.8);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, FALL_COUNT]} renderOrder={6}>
      <planeGeometry args={[0.66, 1]} />
      <meshBasicMaterial map={sprite} transparent alphaTest={0.3} side={THREE.DoubleSide} toneMapped={false} />
    </instancedMesh>
  );
}

const MOTES = 320;

function Motes({ tone }: { tone: Tone }) {
  const dot = useMemo(() => makeDot(), []);
  useEffect(() => () => dot.dispose(), [dot]);
  const points = useRef<THREE.Points>(null);
  const base = useMemo(() => {
    const r = rng(99);
    const arr = new Float32Array(MOTES * 3);
    for (let i = 0; i < MOTES; i++) {
      arr[i * 3] = (r() - 0.5) * 16;
      arr[i * 3 + 1] = (r() - 0.5) * 10;
      arr[i * 3 + 2] = -5 + r() * 9;
    }
    return arr;
  }, []);
  const positions = useMemo(() => base.slice(), [base]);

  useFrame(({ clock }) => {
    const pts = points.current;
    if (!pts) return;
    const t = clock.elapsedTime;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < MOTES; i++) {
      attr.array[i * 3] = base[i * 3] + Math.sin(t * 0.13 + i) * 0.35;
      attr.array[i * 3 + 1] = ((base[i * 3 + 1] + t * 0.05 + 5) % 10) - 5;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={dot}
        color={tone.mote}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={tone.rayBlend}
        toneMapped={false}
      />
    </points>
  );
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  useFrame(({ camera, pointer }) => {
    const p = progress.get();
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.25, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, CAM_Z - p * 1.6, 0.06);
    camera.lookAt(0, p * 0.8, -10);
  });
  return null;
}

export default function CanopyScene({
  palette,
  progress,
  active,
}: {
  palette: Palette;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const tone = tones[palette];
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, CAM_Z], fov: FOV, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <color attach="background" args={[tone.base]} />
      <CameraRig progress={progress} />
      <Backdrop tone={tone} />
      <GodRays tone={tone} />
      <CanopyLayers tone={tone} progress={progress} />
      <Motes tone={tone} />
      <FallingLeaves tone={tone} progress={progress} />
    </Canvas>
  );
}
