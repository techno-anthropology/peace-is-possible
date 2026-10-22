"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Palette } from "@/components/shared/prototype";

// Phone version of the pond: a still photo with 2D ripple rings drawn on a
// canvas where you tap. The animation loop only runs while rings are alive.

type Ring = { x: number; y: number; born: number; amp: number };

export const pondTint: Record<Palette, string> = {
  sage: "rgb(232 240 230 / 0.3)",
  forest: "rgb(4 14 10 / 0.55)",
  dawn: "rgb(0 0 0 / 0)",
};

export function PondPhoto({ palette, priority = false }: { palette: Palette; priority?: boolean }) {
  return (
    <>
      {/* Portrait screens get a tall, sharper photo; wide screens the misty dawn pond. */}
      <Image src="/water/lake-portrait.webp" alt="" fill priority={priority} sizes="100vw" className="object-cover object-[50%_70%] md:hidden" />
      <Image src="/water/pond-dawn.webp" alt="" fill priority={priority} sizes="100vw" className="hidden object-cover object-[50%_60%] md:block" />
      <div className="absolute inset-0 transition-colors duration-700" style={{ background: pondTint[palette] }} />
    </>
  );
}

export default function PondLite({ palette }: { palette: Palette }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const rings: Ring[] = [];
    let raf = 0;
    let running = false;
    let lastAdd = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        const age = (now - r.born) / 1000;
        if (age > 4.5) {
          rings.splice(i, 1);
          continue;
        }
        // Rings are squashed ellipses so they read as lying on the water.
        for (let k = 0; k < 3; k++) {
          const a = age - k * 0.35;
          if (a <= 0) continue;
          const radius = a * 70;
          const alpha = r.amp * Math.max(0, 1 - a / 4) * (0.5 - k * 0.12);
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, radius, radius * 0.28, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
      if (rings.length) raf = requestAnimationFrame(draw);
      else running = false;
    };

    const add = (e: PointerEvent, amp: number) => {
      const rect = cv.getBoundingClientRect();
      const y = e.clientY - rect.top;
      // Only the lower part of the photo is water.
      if (y < rect.height * 0.48) return;
      rings.push({ x: e.clientX - rect.left, y, born: performance.now(), amp });
      if (rings.length > 8) rings.shift();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    const down = (e: PointerEvent) => add(e, 1);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastAdd < 160) return;
      lastAdd = now;
      add(e, 0.5);
    };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <PondPhoto palette={palette} priority />
      <canvas ref={canvas} className="absolute inset-0 size-full touch-pan-y" aria-hidden />
    </div>
  );
}
