import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { CrisisNotice } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { credentials, ctas, footer, nav, site } from "@/content/site";
import { BASE } from "./paths";

export function PeakFooter() {
  return (
    <footer className="bg-[var(--hero-bg)] text-[var(--hero-ink)]">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 pb-28 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href={BASE} className="inline-flex items-center gap-3">
              <Image src={site.logoMark} alt="" width={48} height={48} className="size-12" />
              <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-[var(--hero-ink-2)]">{footer.blurb}</p>
            <BookButton className="mt-6 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]" />
            <ul className="mt-8 flex items-center gap-4" aria-label="Credentials">
              {credentials.map((c) => (
                <li key={c.src}>
                  <Image src={c.src} alt={c.alt} title={c.alt} width={64} height={64} className="size-14 rounded-full object-cover md:size-16" />
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid gap-2.5">
              {nav.map((n) => (
                <li key={n.slug}>
                  <Link href={`${BASE}${n.slug}`} className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`${BASE}/pages/binge-eating-recovery-coaching`} className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
                  Binge eating coaching
                </Link>
              </li>
              <li>
                <Link href={`${BASE}/blogs/news`} className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
                  Articles
                </Link>
              </li>
              <li>
                <Link href={`${BASE}/pages/contact`} className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="grid content-start gap-2.5">
            <a href={site.appUrl} target="_blank" rel="noopener" className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
              {ctas.app}
            </a>
            <a href={site.referralForm} target="_blank" rel="noopener" className="text-[var(--hero-ink-2)] transition hover:text-[var(--hero-ink)]">
              {ctas.refer}
            </a>
            <div className="mt-3 flex gap-2">
              <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-10 place-items-center rounded-full ring-1 ring-[color-mix(in_srgb,var(--hero-ink)_25%,transparent)] transition hover:ring-[var(--hero-ink)]">
                <InstagramLogo size={20} />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-10 place-items-center rounded-full ring-1 ring-[color-mix(in_srgb,var(--hero-ink)_25%,transparent)] transition hover:ring-[var(--hero-ink)]">
                <FacebookLogo size={20} />
              </a>
            </div>
          </div>
        </div>

        <CrisisNotice className="mt-14 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--hero-ink)_7%,transparent)] p-5 text-sm leading-relaxed md:p-6" />

        <div className="mt-10 flex flex-col gap-4 border-t border-[color-mix(in_srgb,var(--hero-ink)_14%,transparent)] pt-6 text-sm text-[var(--hero-ink-2)] md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="transition hover:text-[var(--hero-ink)]">
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
