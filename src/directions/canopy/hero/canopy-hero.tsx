"use client";

import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Leaf } from "@phosphor-icons/react";
import { coaching, home } from "@/content/site";
import { BookButton } from "@/components/shared/booking";
import { usePalette, useSceneMode } from "@/components/shared/prototype";
import { to } from "../paths";
import { btnGhostHero, btnPrimary } from "../ui/styles";


const CanopyScene = dynamic(() => import("./canopy-scene"), { ssr: false });

const still = "/canopy/canopy-sun.webp";
// Portrait, high-res photo for phones, where the landscape one would be upscaled.
const stillTall = "/canopy/canopy-tall.webp";

function Stage({ progress, active, narrow }: { progress: MotionValue<number>; active: boolean; narrow: boolean }) {
  const mode = useSceneMode();
  const palette = usePalette();

  return (
    <div className="absolute inset-0 bg-[var(--hero-bg)]">
      {/* Still image sits underneath until the scene mounts, and is the whole hero under reduced motion. */}
      <Image src={narrow ? stillTall : still} alt="" fill priority sizes="100vw" className="object-cover" />
      {mode === "lite" && <LiteCanopy />}
      {mode === "full" && (
        <div className={`absolute inset-0 cn-fadeIn`}>
          <CanopyScene palette={palette} progress={progress} active={active} />
        </div>
      )}
    </div>
  );
}

const LEAVES = [
  { left: "12%", dur: "19s", delay: "0s", drift: "40px", size: 18 },
  { left: "34%", dur: "23s", delay: "6s", drift: "-30px", size: 14 },
  { left: "58%", dur: "21s", delay: "2s", drift: "50px", size: 20 },
  { left: "76%", dur: "26s", delay: "9s", drift: "-45px", size: 15 },
  { left: "90%", dur: "24s", delay: "4s", drift: "25px", size: 17 },
];

function LiteCanopy() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="cn-shaft" style={{ left: "52%", width: "16%", rotate: "18deg" }} />
      <div className="cn-shaft" style={{ left: "66%", width: "9%", rotate: "24deg", animationDelay: "-3s" }} />
      <div className="cn-shaft" style={{ left: "40%", width: "7%", rotate: "14deg", animationDelay: "-6s" }} />
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="cn-leaf"
          style={
            {
              left: l.left,
              "--dur": l.dur,
              "--delay": l.delay,
              "--drift": l.drift,
              "--leaf-color": i % 2 ? "#9cc79f" : "#d8c46f",
            } as React.CSSProperties
          }
        >
          <Leaf size={l.size} weight="fill" />
        </span>
      ))}
    </div>
  );
}

// Sticky 200vh hero. The scene starts in a rounded window beside the headline
// and opens to full bleed as you scroll; a second line about connection takes
// over once the canopy fills the screen.
export function CanopyHero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  const inView = useInView(section, { margin: "0px 0px 0px 0px" });
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [0, 0.75], [0, 1], { clamp: true });

  // Desktop: window on the right. Mobile: window in the lower half.
  const clipDesktop = useTransform(p, (v) => {
    const k = 1 - v;
    return `inset(${12 * k}% ${4 * k}% ${10 * k}% ${47 * k}% round ${28 * k}px)`;
  });
  const clipMobile = useTransform(p, (v) => {
    const k = 1 - v;
    return `inset(${50 * k}% ${4 * k}% ${3 * k}% ${4 * k}% round ${24 * k}px)`;
  });
  const sceneScale = useTransform(p, [0, 1], [1.3, 1]);
  const introOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const introY = useTransform(p, [0, 0.35], [0, -60]);
  const outroOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.6, 0.85], [40, 0]);

  const [first, ...rest] = coaching.isolation.split(". ");

  if (reduce) {
    return (
      <section className="relative min-h-[100dvh] overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-ink)]">
        <Image src={still} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hero-bg)] via-[color-mix(in_srgb,var(--hero-bg)_70%,transparent)] to-transparent" />
        <HeroCopy />
      </section>
    );
  }

  return (
    <section ref={section} className="relative h-[200vh] bg-[var(--hero-bg)] text-[var(--hero-ink)]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: narrow ? clipMobile : clipDesktop }}>
          <motion.div className="absolute inset-0" style={{ scale: sceneScale }}>
            <Stage progress={p} active={inView} narrow={narrow} />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: introOpacity, y: introY }} className="relative h-full">
          <HeroCopy />
        </motion.div>

        <motion.div
          style={{ opacity: outroOpacity, y: outroY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-16 sm:px-6 md:pb-20 lg:px-10"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="pointer-events-auto max-w-[40rem] rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--hero-bg)_80%,transparent)] p-6 backdrop-blur-md md:bg-[color-mix(in_srgb,var(--hero-bg)_62%,transparent)] md:p-8">
              <p className="text-3xl font-semibold leading-[1.12] tracking-[-0.03em] md:text-[2.6rem]">{first}.</p>
              <p className="mt-3 text-lg leading-relaxed text-[var(--hero-ink-2)]">{rest[0]}.</p>
              <Link href={to("/pages/eating-disorder-recovery-coaching")} className="mt-5 inline-flex items-center gap-2 font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
                How coaching works <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const mq = "(max-width: 767px)";
function useNarrow() {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(mq);
      m.addEventListener("change", notify);
      return () => m.removeEventListener("change", notify);
    },
    () => window.matchMedia(mq).matches,
    () => false,
  );
}

function HeroCopy() {
  return (
    <div className="mx-auto flex h-full min-h-[100dvh] max-w-[1320px] flex-col px-4 pt-24 sm:px-6 md:justify-center md:pt-16 lg:px-10">
      <div className="max-w-[34rem] md:w-[44%]">
        <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.75rem]">
          {home.hero.headline}
        </h1>
        <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-[var(--hero-ink-2)] md:mt-7 md:text-xl">{home.hero.sub}</p>
        <div className="mt-7 flex flex-wrap gap-3 md:mt-9">
          <BookButton className={btnPrimary} />
          <Link href={to("/pages/about")} className={`${btnGhostHero} hidden sm:inline-flex`}>
            Ronnie&apos;s story
          </Link>
        </div>
      </div>
    </div>
  );
}
