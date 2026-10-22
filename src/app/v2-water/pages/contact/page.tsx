import type { Metadata } from "next";
import { ArrowUpRight, FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { contact, ctas, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { BookButton } from "@/components/shared/booking";
import { ContactForm } from "@/components/shared/contact-form";
import { PageIntro, primaryBtn } from "@/directions/water/PageIntro";

export const metadata: Metadata = pageMeta("contact", "/pages/contact");

export default function ContactPage() {
  return (
    <>
      <PageIntro title={contact.h1} lede={contact.lede} image="/water/pond-dawn.webp">
        <BookButton className={primaryBtn} />
      </PageIntro>

      <section className="mx-auto grid max-w-[1400px] items-start gap-12 px-4 py-24 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:px-8 md:py-28">
        <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Send a message</h2>
          <ContactForm className="mt-8" />
        </div>

        <aside className="grid gap-6">
          <div className="rounded-[var(--radius-lg)] bg-[var(--accent)] p-7 text-[var(--accent-ink)] md:p-9">
            <h2 className="text-2xl font-semibold tracking-tight">{contact.referTitle}</h2>
            <p className="mt-3 leading-relaxed opacity-90">{contact.referBody}</p>
            <a
              href={site.referralForm}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-5 py-3 font-semibold text-[var(--ink)] transition hover:brightness-105 active:scale-[0.98]"
            >
              {ctas.refer} <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--line)] p-7">
            <p className="font-semibold">{site.serviceArea}</p>
            <div className="mt-5 flex gap-3">
              <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--accent-soft)]">
                <InstagramLogo size={18} /> Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--accent-soft)]">
                <FacebookLogo size={18} /> Facebook
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
