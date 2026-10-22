"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretUp } from "@phosphor-icons/react";
import type { Coach } from "@/content/site";
import { BookButton } from "@/components/shared/booking";
import { to } from "./paths";

// Portrait card whose info panel rises like a water line on hover, focus or
// tap, revealing focus areas, credentials and a booking button. A single ring
// spreads from where the pointer entered.

type Ring = { id: number; x: number; y: number };

export function TeamCard({ coach, bioLink = false, priority = false }: { coach: Coach; bioLink?: boolean; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [rings, setRings] = useState<Ring[]>([]);
  const reduce = useReducedMotion();
  const panelId = useId();
  const open = hovered || pinned;
  const first = coach.name.split(" ")[0];

  return (
    <article
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] shadow-[0_30px_60px_-40px_rgb(10_40_25/0.55)]"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovered(true);
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        setRings((rs) => [...rs.slice(-2), { id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top }]);
      }}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHovered(false)}
    >
      <motion.div className="absolute inset-0" animate={{ scale: open && !reduce ? 1.04 : 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <Image src={coach.photo} alt={`${coach.name}, ${coach.role}`} fill priority={priority} sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
      </motion.div>

      <AnimatePresence>
        {rings.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden
            className="pointer-events-none absolute size-24 rounded-full border border-white/70"
            style={{ left: r.x - 48, top: r.y - 48 }}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setRings((rs) => rs.filter((x) => x.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      <motion.div
        id={panelId}
        className="absolute inset-x-3 bottom-3 top-3 flex flex-col rounded-[calc(var(--radius-lg)-8px)] bg-[var(--surface)]/88 p-5 text-[var(--ink)] backdrop-blur-md md:p-6"
        initial={false}
        animate={{ y: open ? "0%" : "calc(100% - 6.25rem)" }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight">{coach.name}</h3>
            <p className="mt-0.5 text-sm text-[var(--ink-2)]">{coach.role}</p>
          </div>
          <button
            type="button"
            onClick={() => setPinned((p) => !p)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? `Hide details about ${first}` : `More about ${first}`}
            className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition active:scale-95"
          >
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.5 }}>
              <CaretUp size={18} weight="bold" />
            </motion.span>
          </button>
        </div>

        <motion.div
          className="mt-5 flex min-h-0 flex-1 flex-col"
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.6, delay: open ? 0.25 : 0 }}
          inert={!open}
        >
          <p className="leading-relaxed text-[var(--ink-2)]">{coach.short}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
            {coach.focus.map((f) => (
              <li key={f} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--accent)]">
                {f}
              </li>
            ))}
          </ul>
          <ul className="mt-4 grid gap-1 text-sm text-[var(--ink-2)]" aria-label="Background">
            {coach.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
            <BookButton coach={coach.id} className="rounded-full bg-[var(--accent)] px-5 py-3 text-[15px] font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]">
              Book with {first}
            </BookButton>
            {bioLink && (
              <Link href={to(`/pages/coaches#${coach.id}`)} className="text-[15px] font-medium underline decoration-[var(--accent)] underline-offset-4">
                Full bio
              </Link>
            )}
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
}
