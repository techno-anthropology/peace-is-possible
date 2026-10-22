import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Headphones } from "@phosphor-icons/react/dist/ssr";
import { resources, type ResourceLink } from "@/content/site";
import { articles } from "@/content/articles";
import { pageMeta } from "@/lib/seo";
import { PageIntro } from "@/directions/water/PageIntro";
import { PauseMoment } from "@/directions/water/PauseMoment";
import { Reveal } from "@/directions/water/Reveal";
import { to } from "@/directions/water/paths";

export const metadata: Metadata = pageMeta("resources", "/pages/resource-library");

function LinkList({ items }: { items: ResourceLink[] }) {
  return (
    <ul className="grid gap-1">
      {items.map((l) => (
        <li key={l.url}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener"
            className="group flex items-start justify-between gap-4 rounded-[var(--radius-sm)] px-4 py-3 transition hover:bg-[var(--accent-soft)]"
          >
            <span>
              <span className="font-medium">{l.label}</span>
              {l.note && <span className="block text-sm text-[var(--ink-2)]">{l.note}</span>}
            </span>
            <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--ink-3)] transition group-hover:text-[var(--accent)]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageIntro title={resources.h1} lede={resources.lede} image="/water/lilies.webp" />

      <section className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8">
        <p className="max-w-[75ch] rounded-[var(--radius-md)] border border-[var(--line-strong)] p-5 leading-relaxed text-[var(--ink-2)]">{resources.caution}</p>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Mindfulness meditations from Tara Brach</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.meditations.map((m, i) => (
            <Reveal as="li" key={m.url} delay={i * 0.05}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener"
                className={`group flex h-full min-h-40 flex-col justify-between rounded-[var(--radius-lg)] p-6 transition active:scale-[0.99] ${
                  i === 0 ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]"
                }`}
              >
                <Headphones size={26} className={i === 0 ? "" : "text-[var(--accent)]"} />
                <span className="mt-8 flex items-end justify-between gap-3 text-lg font-semibold leading-snug">
                  {m.label}
                  <ArrowUpRight size={18} className="shrink-0" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--bg-2)] py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Pillars of recovery and wellness</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={to(`/blogs/news/${a.slug}`)} className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-[var(--surface)] p-7 transition hover:shadow-[0_20px_50px_-30px_rgb(10_40_25/0.45)]">
                  <span className="text-xl font-semibold leading-snug tracking-tight transition group-hover:text-[var(--accent)]">{a.title}</span>
                  <span className="mt-3 leading-relaxed text-[var(--ink-2)]">{a.excerpt}</span>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
                    Read <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PauseMoment withLink={false} />

      <section id="support-groups" className="mx-auto grid max-w-[1400px] scroll-mt-24 gap-12 px-4 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Eating disorder support groups and community resources</h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--ink-2)]">{resources.supportGroupsIntro}</p>
        </div>
        <LinkList items={resources.supportGroups} />
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-x-12 gap-y-14 border-t border-[var(--line)] px-4 py-24 md:grid-cols-3 md:px-8 md:py-28">
        <div>
          <h2 className="px-4 text-xl font-semibold tracking-tight">Helpful books and literature</h2>
          <div className="mt-4">
            <LinkList items={resources.books} />
          </div>
        </div>
        <div>
          <h2 className="px-4 text-xl font-semibold tracking-tight">About eating disorders</h2>
          <div className="mt-4">
            <LinkList items={resources.learn} />
          </div>
          <h2 className="mt-10 px-4 text-xl font-semibold tracking-tight">Navigating social situations</h2>
          <div className="mt-4">
            <LinkList items={resources.social} />
          </div>
        </div>
        <div>
          <h2 className="px-4 text-xl font-semibold tracking-tight">Local mental-health resources</h2>
          <div className="mt-4">
            <LinkList items={resources.local} />
          </div>
        </div>
      </section>
    </>
  );
}
