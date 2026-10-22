"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { BookButton } from "@/components/shared/booking";
import type { Coach } from "@/content/site";

// Portrait card after the 21st.dev team-member-card: name and role sit on the
// photo; hover, focus or tap raises a panel with focus areas, credentials and
// a booking button. Pointer movement tilts the card slightly.
export function TeamCard({ coach, bioHref, className = "" }: { coach: Coach; bioHref?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const first = coach.name.split(" ")[0];

  return (
    <motion.article
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        setOpen(false);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
      className={`group relative isolate aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] shadow-[0_30px_60px_-35px_rgb(8_30_20/0.55)] ${className}`}
    >
      <Image
        src={coach.photo}
        alt={`${coach.name}, ${coach.role}`}
        fill
        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover object-top transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(6_16_11/0.88)] via-[rgb(6_16_11/0.15)] to-transparent" />

      <motion.div
        initial={false}
        animate={{ y: open ? 0 : "calc(100% - 5.75rem)" }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className="absolute inset-x-0 bottom-0 p-3 md:p-4"
      >
        <div
          className={`rounded-[var(--radius-md)] p-4 text-[#eef5f0] transition-colors duration-500 md:p-5 ${
            open ? "bg-[rgb(10_26_19/0.82)] backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{coach.name}</h3>
              <p className="mt-0.5 text-sm text-[#c6d6cb]">{coach.role}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? `Hide details about ${first}` : `More about ${first}`}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25 active:scale-95"
            >
              <Plus size={18} weight="bold" className={`transition duration-300 ${open ? "rotate-45" : ""}`} />
            </button>
          </div>

          <div id={panelId} className={`mt-4 grid gap-4 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!open}>
            <p className="text-sm leading-relaxed text-[#d7e4da]">{coach.short}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
              {coach.focus.map((f) => (
                <li key={f} className="rounded-full bg-white/12 px-3 py-1 text-xs font-medium">
                  {f}
                </li>
              ))}
            </ul>
            <ul className="grid gap-1 text-xs text-[#b9cbbf]" aria-label="Credentials">
              {coach.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              <BookButton
                coach={coach.id}
                className="rounded-full bg-[#eef5f0] px-5 py-2.5 text-sm font-semibold text-[#0c1c16] transition hover:bg-white active:scale-[0.98]"
              >
                Book with {first}
              </BookButton>
              {bioHref && (
                <Link href={bioHref} tabIndex={open ? 0 : -1} className="rounded-full px-4 py-2.5 text-sm font-medium text-[#eef5f0] ring-1 ring-white/30 transition hover:ring-white">
                  Read bio
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
