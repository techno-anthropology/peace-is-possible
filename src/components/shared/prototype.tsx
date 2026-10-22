"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Prototype-only chrome: palette toggle + direction switcher. Remove for production.

export type Palette = "forest" | "sage" | "dawn";
export const palettes: { id: Palette; label: string; swatch: [string, string] }[] = [
  { id: "forest", label: "Deep forest", swatch: ["#0b1a13", "#7fd1a6"] },
  { id: "sage", label: "Morning sage", swatch: ["#eaf1e8", "#2c6a4c"] },
  { id: "dawn", label: "Forest to light", swatch: ["#0e2019", "#f1f5ee"] },
];

export const directions = [
  { href: "/v1-canopy", label: "Canopy" },
  { href: "/v2-water", label: "Still water" },
  { href: "/v3-peak", label: "Peak" },
];

const PaletteCtx = createContext<Palette>("forest");
export const usePalette = () => useContext(PaletteCtx);

const read = (key: string, fallback: Palette): Palette => {
  try {
    const v = localStorage.getItem(key);
    return v === "forest" || v === "sage" || v === "dawn" ? v : fallback;
  } catch {
    return fallback;
  }
};

// Wraps a direction. Sets data-palette so the CSS tokens in globals.css apply,
// and exposes the palette to client components (the 3D scenes read it).
export function PaletteRoot({
  direction,
  native,
  className = "",
  children,
}: {
  direction: string;
  native: Palette;
  className?: string;
  children: React.ReactNode;
}) {
  const key = `pip-palette-${direction}`;
  // Stored choice is read on the client only, so server and client HTML match.
  const palette = useSyncExternalStore(
    (notify) => {
      window.addEventListener("pip-palette", notify);
      return () => window.removeEventListener("pip-palette", notify);
    },
    () => read(key, native),
    () => native,
  );

  return (
    <PaletteCtx.Provider value={palette}>
      <div data-palette={palette} data-direction={direction} className={`palette-root ${className}`}>
        {children}
        <PrototypeBar storageKey={key} palette={palette} native={native} />
      </div>
    </PaletteCtx.Provider>
  );
}

function PrototypeBar({ storageKey, palette, native }: { storageKey: string; palette: Palette; native: Palette }) {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState(false);

  const choose = (p: Palette) => {
    try {
      localStorage.setItem(storageKey, p);
    } catch {}
    window.dispatchEvent(new Event("pip-palette"));
  };

  return (
    <div className="fixed bottom-3 left-1/2 z-[70] -translate-x-1/2 md:bottom-5">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#0b1510]/85 p-1 text-[13px] text-white shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpenPanel((o) => !o)}
          className="rounded-full px-3 py-1.5 font-medium hover:bg-white/10"
          aria-expanded={openPanel}
        >
          Prototype
        </button>
        {openPanel && (
          <>
            {directions.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className={`hidden rounded-full px-3 py-1.5 sm:block ${pathname.startsWith(d.href) ? "bg-white text-[#0b1510]" : "hover:bg-white/10"}`}
              >
                {d.label}
              </Link>
            ))}
            <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
            {palettes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p.id)}
                title={`${p.label}${p.id === native ? " (native)" : ""}`}
                aria-label={`Palette: ${p.label}`}
                aria-pressed={palette === p.id}
                className={`grid size-8 place-items-center rounded-full ${palette === p.id ? "ring-2 ring-white" : "hover:bg-white/10"}`}
              >
                <span className="size-5 rounded-full" style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }} />
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

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
