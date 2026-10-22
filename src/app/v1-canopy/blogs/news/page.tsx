import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { articles } from "@/content/articles";
import { formatDate } from "@/components/shared/blocks";
import { site } from "@/content/site";
import { to } from "@/directions/canopy/paths";
import { PageHero } from "@/directions/canopy/ui/page-hero";
import { Reveal } from "@/directions/canopy/ui/reveal";
import { container } from "@/directions/canopy/ui/styles";

export const metadata: Metadata = {
  title: { absolute: "Recovery Articles | Peace is Possible Recovery Coaching" },
  description: "Ronnie's articles on mindfulness, self-compassion, intention and authenticity in eating disorder recovery.",
  alternates: { canonical: `${site.url}/blogs/news` },
};

export default function ArticlesIndex() {
  return (
    <>
      <PageHero title="Recovery articles" lede="Short reads from Ronnie on the practices that helped him recover." image="/canopy/fern.webp" />
      <section className={container}>
        <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.05}>
              <Link href={to(`/blogs/news/${a.slug}`)} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                <span className="text-sm text-[var(--ink-3)] md:col-span-2">{a.date ? formatDate(a.date) : "Guide"}</span>
                <span className="md:col-span-8">
                  <span className="block text-2xl font-semibold leading-snug tracking-[-0.02em] transition group-hover:text-[var(--accent)] md:text-3xl">{a.title}</span>
                  <span className="mt-3 block max-w-[62ch] leading-relaxed text-[var(--ink-2)]">{a.excerpt}</span>
                </span>
                <ArrowRight size={22} className="hidden justify-self-end text-[var(--ink-3)] transition group-hover:translate-x-1 group-hover:text-[var(--accent)] md:col-span-2 md:block" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
