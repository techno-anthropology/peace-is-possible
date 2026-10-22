"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { BookButton } from "@/components/shared/booking";
import { usePalette, useSceneMode } from "@/components/shared/prototype";
import { home } from "@/content/site";
import { sceneColors } from "./scene/palette";
import { BASE } from "./paths";

const PeakScene = dynamic(() => import("./scene/PeakScene"), { ssr: false });

const subscribeWidth = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Sticky 250vh hero. Scroll first opens the framed window to full bleed,
// then flies the camera forward through the mist toward the peak, and the
// scene fades into the page colour as the light sections arrive.
export function PeakHero() {
  const ref = useRef<HTMLElement>(null);
  const mode = useSceneMode();
  const palette = usePalette();
  const colors = sceneColors[palette];
  const compact = useSyncExternalStore(
    subscribeWidth,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  const [inView, setInView] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const open = useTransform(scrollYProgress, [0, 0.38], [1, 0], { clamp: true });
  const top = useTransform(open, (o) => o * (compact ? 13 : 12));
  const side = useTransform(open, (o) => o * (compact ? 4 : 3.2));
  const bottom = useTransform(open, (o) => o * (compact ? 44 : 33));
  const radius = useTransform(open, (o) => o * (compact ? 22 : 30));
  const clipPath = useMotionTemplate`inset(${top}% ${side}% ${bottom}% ${side}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 0.45], [compact ? 1.08 : 1.18, 1]);
  // Phones: lift the scene so the framed window shows the ridges, not just sky.
  const lift = useTransform(scrollYProgress, [0, 0.3], [compact ? "-18%" : "0%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.16], [0, -24]);
  const endFade = useTransform(scrollYProgress, [0.68, 0.98], [0, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const still = `/peak/ridges-${palette}${compact ? "-portrait" : ""}.webp`;
  const useWebGL = mode === "full";

  return (
    <section ref={ref} className="relative h-[250vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[var(--hero-bg)]">
        <motion.div style={{ clipPath }} className="absolute inset-0 will-change-[clip-path]">
          <motion.div style={{ scale, y: lift }} className="absolute inset-0">
            <Image
              src={still}
              alt="Layered mountain ridges and mist below Pikes Peak at dawn"
              fill
              priority
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${useWebGL && sceneReady ? "opacity-0" : "opacity-100"}`}
            />
            {mode === "lite" && <LiteMist />}
            {useWebGL && (
              <PeakScene progress={scrollYProgress} colors={colors} active={inView} onReady={() => setSceneReady(true)} />
            )}
          </motion.div>
          {(mode !== "full" || !sceneReady) && <motion.div style={{ opacity: endFade }} className="absolute inset-0 bg-[var(--bg)]" />}
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 bottom-0 mx-auto grid max-w-[1400px] gap-5 px-4 pb-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-10 md:px-10 md:pb-10"
        >
          <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-[var(--hero-ink)]">
            {home.hero.headline}
          </h1>
          <div className="grid gap-5 md:justify-items-start md:pb-2">
            <p className="max-w-[42ch] text-base leading-relaxed text-[var(--hero-ink-2)] md:text-lg">{home.hero.sub}</p>
            <div className="flex flex-wrap items-center gap-3">
              <BookButton className="rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-ink)] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] transition hover:brightness-110 active:scale-[0.98]" />
              <Link
                href={`${BASE}/pages/about`}
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3 font-medium text-[var(--hero-ink)] ring-1 ring-[color-mix(in_srgb,var(--hero-ink)_30%,transparent)] transition hover:ring-[var(--hero-ink)] active:scale-[0.98]"
              >
                Ronnie&apos;s story
                <ArrowRight size={16} weight="bold" className="transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Phone version: the rendered still plus two CSS mist bands drifting slowly.
function LiteMist() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="peak-mist peak-mist-a" />
      <div className="peak-mist peak-mist-b" />
    </div>
  );
}
