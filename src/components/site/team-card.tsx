"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Plus, X } from "@phosphor-icons/react";
import type { Coach } from "@/content/site";
import { BookButton } from "./booking";
import { btnPrimary } from "./styles";

// Tall photo card. Name and role sit on a soft gradient; hover, focus or tap
// slides up a panel with focus areas, credentials and a booking button.
export function TeamCard({ coach, preload = false, className = "" }: { coach: Coach; preload?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const first = coach.name.split(" ")[0];

  return (
    <article
      className={`group relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] shadow-[0_30px_60px_-30px_rgb(4_20_12/0.5)] ${className}`}
      // Hover opens for mouse only; on touch the button tap is the only toggle,
      // otherwise the emulated hover opens and the tap immediately closes.
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <Image
        src={coach.photo}
        alt={`${coach.name}, ${coach.role}`}
        fill
        preload={preload}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className={`object-cover object-top transition duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "scale-[1.04]" : "scale-100"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(5_18_11/0.88)] via-[rgb(5_18_11/0.15)] via-45% to-transparent" />
      <div className={`absolute inset-0 bg-[rgb(5_18_11/0.7)] backdrop-blur-[2px] transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`} />

      <div className="absolute inset-x-0 bottom-0 p-5 text-[#eef5f0] md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">{coach.name}</h3>
            <p className="mt-1 text-[15px] text-[#c4d6ca]">{coach.role}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? `Hide details for ${coach.name}` : `Show details for ${coach.name}`}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition hover:bg-white/20 active:scale-95"
          >
            {open ? <X size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          inert={!open}
        >
          <div className="pt-5">
            <p className="text-[15px] leading-relaxed text-[#d8e5dc]">{coach.short}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {coach.focus.map((f) => (
                <li key={f} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px]">
                  {f}
                </li>
              ))}
            </ul>
            <ul className="mt-3 grid gap-1 text-[13px] text-[#b9cdbf]">
              {coach.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <BookButton coach={coach.id} className={`${btnPrimary} mt-5 w-full`}>
              Book with {first}
            </BookButton>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
