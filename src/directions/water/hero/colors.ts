import type { Palette } from "@/components/shared/prototype";

// Pond scene colours per palette (sRGB hex). The shader mixes in sRGB space.
export type PondColors = {
  skyTop: string;
  horizon: string;
  mist: string;
  sun: string;
  sunStrength: number;
  deep: string;
  tree: string;
  pad: string;
  reed: string;
};

export const pondColors: Record<Palette, PondColors> = {
  // Pale morning: soft green-blue sky, hazy far shore.
  sage: {
    skyTop: "#b9d3d6",
    horizon: "#eef1e2",
    mist: "#e3eadf",
    sun: "#fff6dc",
    sunStrength: 0.5,
    deep: "#5f8079",
    tree: "#8aa395",
    pad: "#4f7353",
    reed: "#2d4434",
  },
  // Night forest: deep teal water, faint moonlit haze.
  forest: {
    skyTop: "#08161a",
    horizon: "#2a4a44",
    mist: "#35564d",
    sun: "#cfe8dc",
    sunStrength: 0.35,
    deep: "#040d0a",
    tree: "#0d2019",
    pad: "#163322",
    reed: "#030906",
  },
  // First light: warm horizon over cool water.
  dawn: {
    skyTop: "#27485a",
    horizon: "#f3c896",
    mist: "#dcbfa3",
    sun: "#ffe2b0",
    sunStrength: 0.9,
    deep: "#0e2a2c",
    tree: "#2b3f3a",
    pad: "#21402e",
    reed: "#0a1511",
  },
};

export const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Camera shared by the shader and the pointer-to-water mapping.
export const CAMERA = { height: 1, tanHalfFov: 0.4663, pitchStart: -0.045, pitchEnd: -0.17 };

// Screen point (CSS px within the canvas) to a point on the water plane (x, z),
// or null when the point is above the horizon.
export function screenToWater(px: number, py: number, w: number, h: number, pitch: number): [number, number] | null {
  const ux = ((px - 0.5 * w) / h) * 2;
  const uy = ((0.5 * h - py) / h) * 2;
  let dx = ux * CAMERA.tanHalfFov;
  let dy = uy * CAMERA.tanHalfFov;
  let dz = -1;
  const len = Math.hypot(dx, dy, dz);
  dx /= len;
  dy /= len;
  dz /= len;
  const c = Math.cos(pitch);
  const s = Math.sin(pitch);
  const ry = dy * c - dz * s;
  const rz = dy * s + dz * c;
  if (ry > -0.004) return null;
  const t = -CAMERA.height / ry;
  return [dx * t, rz * t];
}
