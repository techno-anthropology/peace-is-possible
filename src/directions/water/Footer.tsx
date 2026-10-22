import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { credentials, ctas, footer, nav, site } from "@/content/site";
import { CrisisNotice } from "@/components/shared/blocks";
import { to } from "./paths";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-2)] pb-24 pt-16 md:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href={to("/")} className="flex items-center gap-3">
            <Image src={site.logoMark} alt="" width={48} height={48} className="size-12" />
            <span className="font-display text-lg font-semibold tracking-tight">{site.shortName}</span>
          </Link>
          <p className="mt-4 max-w-sm leading-relaxed text-[var(--ink-2)]">{footer.blurb}</p>
          <ul className="mt-6 flex items-center gap-4" aria-label="Credentials">
            {credentials.map((c) => (
              <li key={c.src}>
                <Image src={c.src} alt={c.alt} width={64} height={64} className="size-14 rounded-full object-cover" />
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2">
          {[...nav, { slug: "/blogs/news", label: "Articles" }, { slug: "/pages/binge-eating-recovery-coaching", label: "Binge eating coaching" }, { slug: "/pages/contact", label: "Contact" }].map((n) => (
            <Link key={n.slug} href={to(n.slug)} className="text-[var(--ink-2)] hover:text-[var(--ink)]">
              {n.label}
            </Link>
          ))}
          <a href={site.referralForm} target="_blank" rel="noopener" className="text-[var(--ink-2)] hover:text-[var(--ink)]">
            {ctas.refer}
          </a>
          <a href={site.appUrl} target="_blank" rel="noopener" className="text-[var(--ink-2)] hover:text-[var(--ink)]">
            Coping skills app
          </a>
        </nav>

        <div className="grid content-start gap-6">
          <CrisisNotice className="rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface)] p-5 text-[15px] leading-relaxed" />
          <div className="flex gap-2">
            <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--ink-2)] transition hover:text-[var(--ink)]">
              <InstagramLogo size={20} />
            </a>
            <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--ink-2)] transition hover:text-[var(--ink)]">
              <FacebookLogo size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 text-sm text-[var(--ink-3)] md:px-8">
        <span>
          © 2026 {site.name}
        </span>
        {footer.legal.map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noopener" className="hover:text-[var(--ink)]">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
