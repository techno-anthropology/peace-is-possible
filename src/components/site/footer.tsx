import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { credentials, ctas, footer, nav, site } from "@/content/site";
import { CrisisNotice } from "./blocks";
import { container } from "./styles";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--line)] bg-[var(--bg-2)] pb-28 pt-16 md:mt-32 md:pb-24">
      <div className={container}>
        <CrisisNotice className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 text-[15px] leading-relaxed md:p-8" />

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src={site.logoMark} alt="" width={48} height={48} className="size-12 object-contain" />
              <span className="text-lg font-semibold tracking-[-0.02em]">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-[var(--ink-2)]">{footer.blurb}</p>
            <div className="mt-6 flex items-center gap-4">
              {credentials.map((c) => (
                <Image key={c.src} src={c.src} alt={c.alt} width={64} height={64} className="size-14 rounded-full object-contain" />
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="grid gap-2.5">
              {nav.map((n) => (
                <li key={n.slug}>
                  <Link href={n.slug} className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={"/pages/binge-eating-recovery-coaching"} className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
                  Binge eating coaching
                </Link>
              </li>
              <li>
                <Link href={"/blogs/news"} className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
                  Articles
                </Link>
              </li>
              <li>
                <Link href={"/pages/contact"} className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="grid content-start gap-2.5">
            <a href={site.referralForm} target="_blank" rel="noopener" className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
              {ctas.refer}
            </a>
            <a href={site.appUrl} target="_blank" rel="noopener" className="text-[var(--ink-2)] transition hover:text-[var(--ink)]">
              {ctas.app}
            </a>
            <div className="mt-4 flex gap-2">
              <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] transition hover:border-[var(--ink)]">
                <InstagramLogo size={20} />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] transition hover:border-[var(--ink)]">
                <FacebookLogo size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-sm text-[var(--ink-3)] md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="transition hover:text-[var(--ink)]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
