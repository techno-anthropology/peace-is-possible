"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { Palette } from "@/components/shared/prototype";
import { CAMERA, hexToRgb, pondColors, screenToWater } from "./colors";

// A still pond at a low angle, drawn in one full-screen fragment shader:
// analytic ray/plane hit, sky + far shore reflected in the water, lily pads,
// reeds in the foreground, and up to 8 expanding ripple rings from the
// pointer that fade back to stillness.

const RIPPLES = 8;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uPitch;
  uniform vec4 uRipples[${RIPPLES}];
  uniform vec3 uSkyTop, uHorizon, uMist, uSun, uDeep, uTree, uPad, uReed;
  uniform float uSunStrength;

  const float CAM_H = ${CAMERA.height.toFixed(3)};
  const float TAN_HALF = ${CAMERA.tanHalfFov.toFixed(4)};

  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float noise(float x) {
    float i = floor(x); float f = fract(x);
    return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
  }
  float noise2(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(dot(i, vec2(1.0, 57.0)));
    float b = hash(dot(i + vec2(1.0, 0.0), vec2(1.0, 57.0)));
    float c = hash(dot(i + vec2(0.0, 1.0), vec2(1.0, 57.0)));
    float d = hash(dot(i + vec2(1.0, 1.0), vec2(1.0, 57.0)));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  vec3 sky(vec3 d) {
    float elev = d.y;
    vec3 col = mix(uHorizon, uSkyTop, smoothstep(0.0, 0.5, elev));
    vec3 sunDir = normalize(vec3(0.35, 0.06, -1.0));
    float s = max(dot(d, sunDir), 0.0);
    col += uSun * uSunStrength * (pow(s, 380.0) * 0.9 + pow(s, 18.0) * 0.28 + pow(s, 3.0) * 0.08);
    // Far shore: soft hills with a fuzzy tree line, hazed by mist.
    float az = atan(d.x, -d.z);
    float hgt = 0.028 + 0.022 * noise(az * 4.0 + 1.7) + 0.009 * noise(az * 19.0) + 0.004 * noise(az * 63.0);
    float edge = 0.0025;
    float shore = 1.0 - smoothstep(hgt - edge, hgt + edge, elev);
    vec3 treeCol = mix(uTree, uMist, 0.25 + 0.45 * smoothstep(0.0, hgt, elev));
    col = mix(col, treeCol, shore);
    // Mist band hugging the horizon.
    col = mix(col, uMist, exp(-abs(elev) * 30.0) * 0.55);
    return col;
  }

  // Lily pads: (x, z, radius, notch angle)
  const int PADS = 7;
  vec4 pads[PADS] = vec4[PADS](
    vec4(-2.3, -3.6, 0.42, 0.6),
    vec4(-1.7, -4.4, 0.30, 2.4),
    vec4(-2.9, -5.6, 0.36, 4.0),
    vec4(2.6, -4.0, 0.46, 3.3),
    vec4(1.9, -5.2, 0.28, 5.1),
    vec4(3.4, -6.4, 0.38, 1.2),
    vec4(-0.9, -9.5, 0.34, 0.2)
  );

  // Foreground reeds, in screen space. Returns coverage 0..1.
  float reeds(vec2 uv, float aspect) {
    float cover = 0.0;
    for (int i = 0; i < 18; i++) {
      float fi = float(i);
      bool left = i < 9;
      float k = left ? fi : fi - 9.0;
      float baseX = left ? 0.012 + k * 0.016 + hash(fi * 3.1) * 0.02 : 0.99 - k * 0.015 - hash(fi * 5.7) * 0.02;
      float h = 0.16 + hash(fi * 7.3) * 0.3;
      float lean = (left ? 1.0 : -1.0) * (0.01 + hash(fi * 1.9) * 0.05);
      float y = uv.y + 0.02;
      if (y < 0.0 || y > h) continue;
      float t = y / h;
      float sway = sin(uTime * 0.45 + fi * 1.3) * 0.006 * t * t;
      float x = baseX + (lean * t * t + sway);
      float w = mix(0.0032, 0.0006, t) / aspect * 1.6;
      float dx = abs(uv.x - x);
      float aa = fwidth(uv.x) * 1.2;
      cover = max(cover, 1.0 - smoothstep(w - aa, w + aa, dx));
      // Seed head on some stalks.
      if (hash(fi * 9.1) > 0.6) {
        vec2 hc = vec2(baseX + lean * 0.81 + sin(uTime * 0.45 + fi * 1.3) * 0.006 * 0.81, h * 0.86 - 0.02);
        vec2 q = (uv - hc) * vec2(aspect / 1.6, 1.0);
        float e = length(q / vec2(0.0042, 0.03));
        cover = max(cover, 1.0 - smoothstep(0.9, 1.1, e));
      }
    }
    return cover;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 ndc = vec2((vUv.x - 0.5) * 2.0 * aspect, (vUv.y - 0.5) * 2.0);
    vec3 dir = normalize(vec3(ndc.x * TAN_HALF, ndc.y * TAN_HALF, -1.0));
    float c = cos(uPitch), s = sin(uPitch);
    dir = vec3(dir.x, dir.y * c - dir.z * s, dir.y * s + dir.z * c);

    vec3 col;
    if (dir.y > -0.0005) {
      col = sky(dir);
    } else {
      float t = -CAM_H / dir.y;
      vec2 p = vec2(dir.x * t, dir.z * t);

      // Ripple rings: travelling wave packets that decay with age and distance.
      vec2 grad = vec2(0.0);
      for (int i = 0; i < ${RIPPLES}; i++) {
        vec4 r = uRipples[i];
        float age = uTime - r.z;
        if (r.w <= 0.0 || age < 0.0 || age > 9.0) continue;
        vec2 dv = p - r.xy;
        float d = length(dv) + 1e-4;
        float sdist = d - age * 0.85;
        float env = r.w * exp(-sdist * sdist * 5.0) * exp(-age * 0.55) * smoothstep(0.0, 0.25, age) / (1.0 + d * 0.6);
        float dh = env * (16.0 * cos(sdist * 16.0) - 10.0 * sdist * sin(sdist * 16.0));
        grad += dh * dv / d;
      }
      // Barely-there breathing so the surface never looks frozen.
      vec2 q = p * 0.9 + vec2(uTime * 0.03, uTime * 0.02);
      grad += (vec2(noise2(q * 2.0), noise2(q * 2.0 + 17.0)) - 0.5) * 0.012;

      float distFade = smoothstep(4.0, 40.0, t);
      grad *= mix(0.055, 0.02, distFade);
      vec3 n = normalize(vec3(-grad.x, 1.0, -grad.y));

      vec3 refl = reflect(dir, n);
      refl.y = max(refl.y, 0.0005);
      float fres = 0.03 + 0.97 * pow(1.0 - max(dot(n, -dir), 0.0), 5.0);
      col = mix(uDeep, sky(refl), clamp(fres * 1.05, 0.0, 1.0));

      // Lily pads float on the surface and drift with the ripples.
      for (int i = 0; i < PADS; i++) {
        vec4 pd = pads[i];
        vec2 pp = p - pd.xy + grad * 6.0;
        float d = length(pp);
        float ang = atan(pp.y, pp.x);
        float notch = smoothstep(0.18, 0.08, abs(mod(ang - pd.w + 3.14159, 6.28318) - 3.14159));
        float rr = pd.z * (1.0 - notch * 0.55);
        float aa = fwidth(d) * 1.5;
        float m = 1.0 - smoothstep(rr - aa, rr + aa, d);
        float veins = 0.92 + 0.08 * sin(ang * 14.0);
        vec3 padCol = uPad * veins * (0.9 + 0.2 * smoothstep(rr * 0.6, rr, d));
        padCol = mix(padCol, uMist, distFade * 0.6);
        col = mix(col, padCol, m);
      }

      col = mix(col, uMist, smoothstep(10.0, 70.0, t) * 0.55);
    }

    // Foreground reeds sit in front of everything.
    float rc = reeds(vUv, aspect);
    col = mix(col, uReed, rc * 0.96);

    // Gentle vignette.
    vec2 v = vUv - 0.5;
    col *= 1.0 - dot(v, v) * 0.22;

    gl_FragColor = vec4(col, 1.0);
  }
`;

type Props = {
  palette: Palette;
  progress: MotionValue<number>;
};

type Uniforms = THREE.ShaderMaterial["uniforms"];

// Per-frame update, kept outside the component so uniforms are plain mutable data.
function step(
  u: Uniforms,
  time: number,
  delta: number,
  w: number,
  h: number,
  p: number,
  target: (typeof pondColors)[Palette],
  next: { current: number },
  nextAmbient: { current: number },
) {
  u.uTime.value = time;
  (u.uRes.value as THREE.Vector2).set(w, h);
  const wanted = CAMERA.pitchStart + (CAMERA.pitchEnd - CAMERA.pitchStart) * Math.min(1, p / 0.7);
  u.uPitch.value += (wanted - u.uPitch.value) * Math.min(1, delta * 4);

  // Ease colours toward the active palette.
  const k = Math.min(1, delta * 2.5);
  const lerp = (vec: THREE.Vector3, hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    vec.x += (r - vec.x) * k;
    vec.y += (g - vec.y) * k;
    vec.z += (b - vec.z) * k;
  };
  lerp(u.uSkyTop.value, target.skyTop);
  lerp(u.uHorizon.value, target.horizon);
  lerp(u.uMist.value, target.mist);
  lerp(u.uSun.value, target.sun);
  lerp(u.uDeep.value, target.deep);
  lerp(u.uTree.value, target.tree);
  lerp(u.uPad.value, target.pad);
  lerp(u.uReed.value, target.reed);
  u.uSunStrength.value += (target.sunStrength - u.uSunStrength.value) * k;

  // Now and then a single drop lands somewhere, then the pond goes still again.
  if (time > nextAmbient.current) {
    const x = (Math.random() - 0.5) * 4;
    const z = -3.5 - Math.random() * 5;
    (u.uRipples.value as THREE.Vector4[])[next.current].set(x, z, time, 0.55);
    next.current = (next.current + 1) % RIPPLES;
    nextAmbient.current = time + 6 + Math.random() * 4;
  }
}

function Pond({ palette, progress }: Props) {
  const { size, viewport, gl } = useThree();
  const target = useMemo(() => pondColors[palette], [palette]);

  const uniforms = useMemo(() => {
    const c = pondColors[palette];
    const v = (hex: string) => new THREE.Vector3(...hexToRgb(hex));
    return {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPitch: { value: CAMERA.pitchStart },
      uRipples: { value: Array.from({ length: RIPPLES }, () => new THREE.Vector4(0, 0, -100, 0)) },
      uSkyTop: { value: v(c.skyTop) },
      uHorizon: { value: v(c.horizon) },
      uMist: { value: v(c.mist) },
      uSun: { value: v(c.sun) },
      uDeep: { value: v(c.deep) },
      uTree: { value: v(c.tree) },
      uPad: { value: v(c.pad) },
      uReed: { value: v(c.reed) },
      uSunStrength: { value: c.sunStrength },
    };
    // Built once; palette changes lerp toward `target` in useFrame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Uniforms are mutated through the material ref every frame.
  const mat = useRef<THREE.ShaderMaterial>(null);
  const next = useRef(0);
  const lastMove = useRef({ t: 0, x: 0, z: 0 });
  const nextAmbient = useRef(2.5);

  // Pointer → ripples. Listeners sit on the canvas element itself.
  useEffect(() => {
    const el = gl.domElement;
    const add = (e: PointerEvent, amp: number, minGap: number) => {
      const u = mat.current?.uniforms;
      if (!u) return;
      const rect = el.getBoundingClientRect();
      const hit = screenToWater(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height, u.uPitch.value);
      if (!hit) return;
      const now = u.uTime.value;
      const lm = lastMove.current;
      if (minGap > 0 && (now - lm.t < minGap || Math.hypot(hit[0] - lm.x, hit[1] - lm.z) < 0.35)) return;
      lastMove.current = { t: now, x: hit[0], z: hit[1] };
      u.uRipples.value[next.current].set(hit[0], hit[1], now, amp);
      next.current = (next.current + 1) % RIPPLES;
    };
    const move = (e: PointerEvent) => e.pointerType === "mouse" && add(e, 0.38, 0.11);
    const down = (e: PointerEvent) => add(e, 1, 0);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (mat.current) step(mat.current.uniforms, state.clock.elapsedTime, delta, size.width * viewport.dpr, size.height * viewport.dpr, progress.get(), target, next, nextAmbient);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export default function PondScene({ palette, progress }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 touch-pan-y">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <Pond palette={palette} progress={progress} />
      </Canvas>
    </div>
  );
}
