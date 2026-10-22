"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { resources } from "@/content/site";
import { to } from "./paths";

// One coping idea at a time, over still water. Asking for another is the
// whole interaction: small, unhurried, no pressure to try them all.
export function PauseMoment({ withLink = true }: { withLink?: boolean }) {
  const [i, setI] = useState(0);
  const ideas = resources.compulsion;

  return (
    <section aria-labelledby="pause-title" className="relative isolate overflow-hidden">
      <Image src="/water/lilies.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[var(--hero-bg)]/70" />
      <div className="mx-auto grid min-h-[80dvh] max-w-[1400px] items-center gap-10 px-4 py-24 md:grid-cols-[1fr_1.1fr] md:px-8">
        <div>
          <h2 id="pause-title" className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-[var(--hero-ink)] md:text-5xl">
            What to do when you feel a compulsion
          </h2>
          {withLink && (
            <Link href={to("/pages/resource-library")} className="mt-6 inline-block font-medium text-[var(--hero-ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
              More in the resource library
            </Link>
          )}
        </div>
        <div className="rounded-[var(--radius-lg)] bg-[var(--surface)]/85 p-7 text-[var(--ink)] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] backdrop-blur-md md:p-10">
          <div className="relative min-h-[7.5rem] md:min-h-[6.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl"
              >
                {ideas[i]}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => setI((n) => (n + 1) % ideas.length)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-3 font-semibold transition hover:bg-[var(--accent-soft)] active:scale-[0.98]"
          >
            <ArrowsClockwise size={18} /> Another idea
          </button>
        </div>
      </div>
    </section>
  );
}
