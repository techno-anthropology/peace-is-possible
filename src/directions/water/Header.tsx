"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { nav, site } from "@/content/site";
import { BookButton } from "@/components/shared/booking";
import { to } from "./paths";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  // Over the home hero the header borrows the hero's ink so it reads in every palette.
  const overHero = pathname === to("/") && !solid && !open;
  const heroInk = overHero ? ({ "--ink": "var(--hero-ink)", "--ink-2": "var(--hero-ink-2)" } as React.CSSProperties) : undefined;

  return (
    <header
      style={heroInk}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid || open ? "bg-[var(--bg)]/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 md:h-[72px] md:px-8">
        <Link href={to("/")} className="flex shrink-0 items-center gap-2.5" aria-label={`${site.shortName} home`}>
          <Image src={site.logoMark} alt="" width={40} height={40} className="size-9 md:size-10" priority />
          <span className="font-display text-[15px] font-semibold leading-tight tracking-tight text-[var(--ink)]">
            Peace is Possible
            <span className="block text-[11px] font-medium text-[var(--ink-2)]">Recovery Coaching</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const href = to(item.slug);
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition hover:bg-[var(--accent-soft)] ${
                      active ? "text-[var(--accent)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <BookButton className="ml-auto hidden whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98] sm:block lg:ml-2" />

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="ml-auto grid size-11 place-items-center rounded-full text-[var(--ink)] transition hover:bg-[var(--accent-soft)] active:scale-95 sm:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="water-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="water-mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[var(--line)] px-4 pb-6 pt-2 lg:hidden"
          >
            <ul className="grid gap-1">
              {[{ slug: "/", label: "Home" }, ...nav, { slug: "/pages/contact", label: "Contact" }].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={to(item.slug)}
                    onClick={() => setOpen(false)}
                    className="block rounded-[var(--radius-sm)] px-3 py-3 text-lg font-medium text-[var(--ink)] hover:bg-[var(--accent-soft)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <BookButton className="mt-4 w-full rounded-full bg-[var(--accent)] px-5 py-3.5 font-semibold text-[var(--accent-ink)] active:scale-[0.98] sm:hidden" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
