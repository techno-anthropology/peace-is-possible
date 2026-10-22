import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { formatDate } from "@/components/shared/blocks";
import { PageIntro } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";
import { to } from "@/directions/water/paths";

export const metadata: Metadata = {
  title: { absolute: "Recovery Articles: Mindfulness, Compassion & Intention | Peace is Possible" },
  description: "Articles by Ronnie on mindfulness, self-compassion, intention and authenticity in eating disorder recovery.",
  alternates: { canonical: `${site.url}/blogs/news` },
};

export default function BlogIndex() {
  const [first, ...rest] = articles;
  return (
    <>
      <PageIntro title="Pillars of recovery and wellness" image="/water/mist-trees.webp" />
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <Link href={to(`/blogs/news/${first.slug}`)} className="group block rounded-[var(--radius-lg)] bg-[var(--accent)] p-8 text-[var(--accent-ink)] md:p-14">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{first.title}</h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed opacity-90">{first.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold">
              Read <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.06}>
              <Link href={to(`/blogs/news/${a.slug}`)} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 transition hover:border-[var(--accent)]">
                {a.date && <span className="text-sm text-[var(--ink-3)]">{formatDate(a.date)}</span>}
                <span className="mt-3 text-xl font-semibold leading-snug tracking-tight group-hover:text-[var(--accent)]">{a.title}</span>
                <span className="mt-3 leading-relaxed text-[var(--ink-2)]">{a.excerpt}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
