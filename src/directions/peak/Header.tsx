"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { BookButton } from "@/components/shared/booking";
import { nav, site } from "@/content/site";
import { BASE } from "./paths";

// Transparent over the dark page top, then a frosted bar in page colours once
// the reader scrolls.
export function PeakHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    if (next !== solid) setSolid(next);
  });

  const tone = solid || menu ? "text-[var(--ink)]" : "text-[var(--hero-ink)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        solid || menu
          ? "bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
          : "bg-transparent"
      } ${tone}`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 md:h-[72px] md:px-10">
        <Link href={BASE} className="flex shrink-0 items-center gap-2.5" onClick={() => setMenu(false)}>
          <Image src={site.logoMark} alt="" width={40} height={40} className="size-9 md:size-10" priority />
          <span className="font-display text-[1.05rem] leading-none font-semibold tracking-tight">
            Peace is Possible
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const to = `${BASE}${n.slug}`;
              const active = pathname === to;
              return (
                <li key={n.slug}>
                  <Link
                    href={to}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-2 text-[0.94rem] whitespace-nowrap transition hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] ${
                      active ? "font-semibold" : "opacity-85"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <BookButton className="ml-auto hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[0.94rem] font-semibold whitespace-nowrap text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98] sm:block lg:ml-2" />

        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          className="ml-auto grid size-10 place-items-center rounded-full transition hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] sm:ml-0 lg:hidden"
          aria-expanded={menu}
          aria-controls="peak-menu"
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="peak-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[var(--line)] px-4 pt-2 pb-6 lg:hidden"
          >
            <ul className="grid">
              {nav.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`${BASE}${n.slug}`}
                    onClick={() => setMenu(false)}
                    className="font-display block border-b border-[var(--line)] py-3.5 text-xl font-medium"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`${BASE}/pages/contact`} onClick={() => setMenu(false)} className="font-display block py-3.5 text-xl font-medium">
                  Contact
                </Link>
              </li>
            </ul>
            <BookButton className="mt-3 w-full rounded-full bg-[var(--accent)] px-5 py-3.5 font-semibold text-[var(--accent-ink)] active:scale-[0.98]" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
