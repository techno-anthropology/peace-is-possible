import { testimonials } from "@/content/site";
import { BookButton } from "@/components/shared/booking";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/directions/canopy/ui/page-hero";
import { Reveal } from "@/directions/canopy/ui/reveal";
import { btnPrimary, container } from "@/directions/canopy/ui/styles";

export const metadata = pageMeta("testimonials", "/pages/testimonials");

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        lede="Peace is Possible is honored to support people in Colorado Springs and online as they recover from eating disorders and addiction. Here is what clients say."
        image="/canopy/canopy-bright.webp"
      />
      <section className={container}>
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
              <figure className={`rounded-[var(--radius-lg)] p-7 md:p-8 ${i === 0 ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"}`}>
                <blockquote className="text-[17px] leading-relaxed">{t.full}</blockquote>
                <figcaption className={`mt-6 text-sm font-semibold ${i === 0 ? "opacity-75" : "text-[var(--ink-3)]"}`}>{t.tag}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <BookButton className={btnPrimary} />
        </div>
      </section>
    </>
  );
}
