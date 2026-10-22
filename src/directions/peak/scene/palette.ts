import type { Palette } from "@/components/shared/prototype";

// Scene colours per palette. The hero ends on `end`, which matches the page
// background below so the scene dissolves into the first light section.
export type SceneColors = {
  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  glow: string;
  ridgeFar: string;
  ridgeNear: string;
  rim: string;
  fog: string;
  mist: string;
  end: string;
};

export const sceneColors: Record<Palette, SceneColors> = {
  dawn: {
    skyTop: "#0f2a22",
    skyMid: "#3f6b5c",
    skyHorizon: "#d3e2c4",
    glow: "#eef0cc",
    ridgeFar: "#7c9a89",
    ridgeNear: "#0c1d16",
    rim: "#dbe8c8",
    fog: "#a3baa6",
    mist: "#e3eedc",
    end: "#f1f5ef",
  },
  forest: {
    skyTop: "#050e0a",
    skyMid: "#173326",
    skyHorizon: "#2f5a46",
    glow: "#9fd8b0",
    ridgeFar: "#3a5e4c",
    ridgeNear: "#06100b",
    rim: "#7fbf98",
    fog: "#25443a",
    mist: "#6f9a83",
    end: "#0a1711",
  },
  sage: {
    skyTop: "#9fbaa6",
    skyMid: "#cbdccb",
    skyHorizon: "#f2f1d8",
    glow: "#fff6cf",
    ridgeFar: "#b3c8b6",
    ridgeNear: "#3d5c4b",
    rim: "#f4f8ea",
    fog: "#d6e2d2",
    mist: "#ffffff",
    end: "#eef3ec",
  },
};
