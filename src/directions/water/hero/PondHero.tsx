"use client";

import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { usePalette, useSceneMode, type Palette } from "@/components/shared/prototype";
import { BookButton } from "@/components/shared/booking";
import { home } from "@/content/site";
import { to } from "../paths";
import PondLite, { PondPhoto } from "./PondLite";

const PondScene = dynamic(() => import("./PondScene"), { ssr: false });

const quote = {
  text: "Mindfulness is simply noticing what’s happening, with less judgment and more kindness.",
  source: "Ronnie, on mindfulness in recovery",
};

const subscribeMq = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useIsMobile = () =>
  useSyncExternalStore(
    subscribeMq,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Stage({ palette, progress }: { palette: Palette; progress: MotionValue<number> }) {
  const mode = useSceneMode();
  if (mode === "full") {
    return (
      <>
        <PondPhoto palette={palette} priority />
        <PondScene palette={palette} progress={progress} />
      </>
    );
  }
  if (mode === "lite") return <PondLite palette={palette} />;
  return <PondPhoto palette={palette} priority />;
}

// Sticky hero: a framed window onto the pond widens to full bleed as you
// scroll, the camera tilts toward the water, and the intro gives way to a
// single line about noticing.
export function PondHero() {
  const section = useRef<HTMLElement>(null);
  const palette = usePalette();
  const mobile = useIsMobile();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  // Expansion happens over the first 60% of the hero's scroll.
  const open = useTransform(scrollYProgress, [0, 0.6], [0, 1], { clamp: true });
  const clipPath = useTransform(open, (t) => {
    const e = 1 - Math.pow(1 - t, 3);
    const [top, right, bottom, left, round] = mobile ? [49, 4, 4, 4, 24] : [13, 4.5, 8, 47, 32];
    return `inset(${lerp(top, 0, e)}% ${lerp(right, 0, e)}% ${lerp(bottom, 0, e)}% ${lerp(left, 0, e)}% round ${lerp(round, 0, e)}px)`;
  });
  const scale = useTransform(open, [0, 1], [1.3, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const introEvents = useTransform(introOpacity, (o) => (o < 0.15 ? "none" : "auto"));
  const quoteOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.5, 0.75], [30, 0]);

  return (
    <section ref={section} aria-label="Introduction" className="relative h-[200dvh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[var(--hero-bg)]">
        <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
            <Stage palette={palette} progress={open} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: introOpacity, y: introY, pointerEvents: introEvents }}
          className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-4 pt-24 md:justify-center md:px-8 md:pt-16"
        >
          <div className="max-w-[34rem] md:w-[40%] md:max-w-none">
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--hero-ink)] md:text-6xl lg:text-7xl">
              {home.hero.headline}
            </h1>
            <p className="mt-5 max-w-[30rem] text-base leading-relaxed text-[var(--hero-ink-2)] md:mt-6 md:text-lg">{home.hero.sub}</p>
            <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-9">
              <BookButton className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-ink)] shadow-[0_12px_30px_-12px_var(--accent)] transition hover:brightness-110 active:scale-[0.98]" />
              <Link href={to("/pages/about")} className="font-medium text-[var(--hero-ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]">
                Read Ronnie&apos;s story
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.figure
          style={{ opacity: reduce ? 0 : quoteOpacity, y: quoteY }}
          className="pointer-events-none absolute inset-x-4 bottom-10 z-10 mx-auto max-w-xl rounded-[var(--radius-lg)] bg-[var(--surface)]/80 p-6 text-[var(--ink)] shadow-[0_20px_60px_-30px_rgb(0_0_0/0.5)] backdrop-blur-md md:bottom-16 md:p-8"
          aria-hidden={reduce ? true : undefined}
        >
          <blockquote className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">{quote.text}</blockquote>
          <figcaption className="mt-3 text-sm text-[var(--ink-2)]">{quote.source}</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
