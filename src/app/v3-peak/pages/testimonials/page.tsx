import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { BookButton } from "@/components/shared/booking";
import { testimonials } from "@/content/site";
import { Reveal } from "@/directions/peak/Reveal";
import { ClosingCta, PageBand, btnPrimary } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("testimonials", "/pages/testimonials");

export default function TestimonialsPage() {
  return (
    <>
      <PageBand title="What clients say" />
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
        <ul className="gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <li key={t.short} className="mb-5 break-inside-avoid">
              <Reveal delay={(i % 3) * 0.08}>
                <figure className={`rounded-[var(--radius-lg)] p-7 md:p-8 ${i === 0 ? "bg-[var(--hero-bg)] text-[var(--hero-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"}`}>
                  <Quotes size={28} weight="fill" className="text-[var(--accent)]" />
                  <blockquote className={`mt-4 leading-relaxed ${i === 0 ? "text-lg" : ""}`}>{t.full}</blockquote>
                  <figcaption className={`mt-6 text-sm font-medium ${i === 0 ? "text-[var(--hero-ink-2)]" : "text-[var(--ink-2)]"}`}>{t.tag}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <ClosingCta title="Start with a free call" body="The first step is a free phone consultation.">
        <BookButton className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
