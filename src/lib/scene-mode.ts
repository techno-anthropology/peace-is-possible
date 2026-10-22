"use client";

import { useSyncExternalStore } from "react";

// How heavy the hero scene may be on this device.
// full: WebGL scene. lite: cheap 2D/CSS version for phones and low-power
// devices. still: a static image for reduced motion or no WebGL.
export type SceneMode = "full" | "lite" | "still";

function detectSceneMode(): SceneMode {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still";
  let webgl = false;
  try {
    webgl = !!document.createElement("canvas").getContext("webgl2");
  } catch {}
  if (!webgl) return "lite";
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
  return small || (coarse && lowCpu) ? "lite" : "full";
}

let cachedMode: SceneMode | null = null;

// null during SSR and the first client render; scenes render their still
// image until the mode is known.
export function useSceneMode(): SceneMode | null {
  return useSyncExternalStore(
    () => () => {},
    () => (cachedMode ??= detectSceneMode()),
    () => null,
  );
}
