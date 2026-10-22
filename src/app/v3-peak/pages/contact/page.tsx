import { ArrowUpRight, FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { CrisisNotice } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { ContactForm } from "@/components/shared/contact-form";
import { contact, ctas, site } from "@/content/site";
import { PageBand, btnGhost, btnPrimary } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "/pages/contact");

export default function ContactPage() {
  return (
    <>
      <PageBand title={contact.h1} lede={contact.lede}>
        <BookButton className={btnPrimary} />
      </PageBand>
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:px-10 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Send a message</h2>
          <ContactForm className="mt-6" />
        </div>
        <div className="grid content-start gap-6">
          <div className="rounded-[var(--radius-lg)] bg-[var(--hero-bg)] p-6 text-[var(--hero-ink)] md:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{contact.referTitle}</h2>
            <p className="mt-3 leading-relaxed text-[var(--hero-ink-2)]">{contact.referBody}</p>
            <a href={site.referralForm} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--hero-ink)] px-6 py-3 font-semibold text-[var(--hero-bg)] transition hover:opacity-90 active:scale-[0.98]">
              {ctas.refer} <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.instagram} target="_blank" rel="noopener" className={btnGhost}>
              <InstagramLogo size={18} /> Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noopener" className={btnGhost}>
              <FacebookLogo size={18} /> Facebook
            </a>
          </div>
          <CrisisNotice className="rounded-[var(--radius-lg)] border border-[var(--line-strong)] p-6 text-sm leading-relaxed" />
        </div>
      </section>
    </>
  );
}
