"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

// Ronnie's story as a climb: a path draws itself down the page as you read,
// with each chapter as a waypoint on it.
export function Trail({ chapters }: { chapters: { title: string; body: string[] }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <ol ref={ref} className="relative grid gap-16 pl-10 md:gap-20 md:pl-16">
      <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-[2px] bg-[var(--line)] md:left-[19px]" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : draw }}
        className="absolute top-2 bottom-2 left-[11px] w-[2px] origin-top bg-[var(--accent)] md:left-[19px]"
      />
      {chapters.map((c, i) => (
        <li key={c.title} className="relative">
          <span
            aria-hidden
            className={`peak-trail-dot absolute top-1.5 -left-10 grid size-6 place-items-center rounded-full md:-left-16 md:size-10 ${
              i === chapters.length - 2 ? "bg-[var(--accent)]" : "bg-[var(--surface)]"
            }`}
          >
            <span className={`size-2 rounded-full md:size-2.5 ${i === chapters.length - 2 ? "bg-[var(--accent-ink)]" : "bg-[var(--accent)]"}`} />
          </span>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h2>
            <div className="mt-4 grid max-w-[64ch] gap-4 text-[1.0625rem] leading-[1.75] text-[var(--ink-2)]">
              {c.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
