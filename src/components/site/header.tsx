"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { nav, site } from "@/content/site";
import { BagButton } from "./bag";
import { BookButton } from "./booking";
import { btnPrimary } from "./styles";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  // Only flips state when crossing the threshold, not on every frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  const overHero = onHome && !scrolled && !menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ${
          overHero
            ? "border-b border-transparent text-[var(--hero-ink)]"
            : "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] text-[var(--ink)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.shortName} home`}>
            <Image src={site.logoMark} alt="" width={40} height={40} className="size-9 lg:size-10" priority />
            <span className="text-[17px] font-semibold tracking-[-0.02em]">{site.shortName}</span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => {
                const href = n.slug;
                const active = pathname.startsWith(href);
                return (
                  <li key={n.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-medium transition ${
                        active ? "bg-[var(--accent-soft)]" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
            <div className="mr-1.5 hidden sm:block">
              <BookButton className={`${btnPrimary} !px-5 !py-2.5`} />
            </div>
            <BagButton />
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              className="grid size-10 place-items-center rounded-full transition hover:bg-[var(--accent-soft)] active:scale-95 lg:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-menu"
            >
              {menu ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] px-4 pb-10 pt-24 sm:px-6 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="grid gap-1">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={n.slug}
                      onClick={() => setMenu(false)}
                      className="block border-b border-[var(--line)] py-4 text-2xl font-semibold tracking-[-0.02em]"
                    >
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
                <li>
                  <Link href={"/pages/contact"} onClick={() => setMenu(false)} className="block py-4 text-lg text-[var(--ink-2)]">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div onClick={() => setMenu(false)}>
              <BookButton className={`${btnPrimary} mt-6 w-full`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
