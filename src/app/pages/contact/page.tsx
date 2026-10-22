import { ArrowUpRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { contact, crisis, ctas, site } from "@/content/site";
import { BookButton } from "@/components/site/booking";
import { ContactForm } from "@/components/site/contact-form";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { btnGhost, btnPrimary, container } from "@/components/site/styles";

export const metadata = pageMeta("contact");

export default function ContactPage() {
  return (
    <>
      <PageHero title={contact.h1} lede={contact.lede} />
      <section className={`${container} grid gap-10 lg:grid-cols-12`}>
        <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10 lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="grid content-start gap-5 lg:col-span-5">
          <div className="rounded-[var(--radius-lg)] bg-[var(--hero-bg)] p-7 text-[var(--hero-ink)]">
            <h2 className="text-xl font-semibold">The fastest way to start</h2>
            <p className="mt-2 leading-relaxed text-[var(--hero-ink-2)]">A free phone consultation with Ronnie or Sara.</p>
            <BookButton className={`${btnPrimary} mt-5`} />
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--bg-2)] p-7">
            <h2 className="text-xl font-semibold">{contact.referTitle}</h2>
            <p className="mt-2 leading-relaxed text-[var(--ink-2)]">{contact.referBody}</p>
            <a href={site.referralForm} target="_blank" rel="noopener" className={`${btnGhost} mt-5`}>
              {ctas.refer} <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
          <div className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--line)] p-7">
            <Phone size={22} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <div>
              <h2 className="font-semibold">{crisis.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">{crisis.body}</p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
