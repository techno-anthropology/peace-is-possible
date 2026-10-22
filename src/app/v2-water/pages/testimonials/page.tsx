import type { Metadata } from "next";
import { seo, testimonials } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { BookButton } from "@/components/shared/booking";
import { PageIntro, primaryBtn } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";

export const metadata: Metadata = pageMeta("testimonials", "/pages/testimonials");

export default function TestimonialsPage() {
  const [featured, ...rest] = testimonials;
  return (
    <>
      <PageIntro title="What clients say" lede={seo.testimonials.description} image="/water/pond-trees.webp" />

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <figure className="max-w-5xl">
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">{featured.full}</blockquote>
            <figcaption className="mt-6 text-[var(--ink-2)]">{featured.tag}</figcaption>
          </figure>
        </Reveal>

        <div className="mt-20 columns-1 gap-5 md:columns-2 lg:columns-3">
          {rest.map((t, i) => (
            <Reveal key={i} className="mb-5 break-inside-avoid">
              <figure className={`rounded-[var(--radius-lg)] p-7 md:p-8 ${i === 2 ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"}`}>
                <blockquote className="leading-relaxed">{t.full}</blockquote>
                <figcaption className={`mt-5 text-sm ${i === 2 ? "opacity-80" : "text-[var(--ink-2)]"}`}>{t.tag}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <BookButton className={primaryBtn} />
        </div>
      </section>
    </>
  );
}
