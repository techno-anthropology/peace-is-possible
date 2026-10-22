import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Headphones, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { resources, type ResourceLink } from "@/content/site";
import { articles } from "@/content/articles";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { container, h2 } from "@/components/site/styles";

export const metadata = pageMeta("resources", "/pages/resource-library");

function LinkList({ items }: { items: ResourceLink[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((l) => (
        <li key={l.url}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener"
            className="group flex items-start justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 transition hover:border-[var(--accent)]"
          >
            <span>
              <span className="font-medium">{l.label}</span>
              {l.note && <span className="mt-0.5 block text-sm text-[var(--ink-3)]">{l.note}</span>}
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
      <PageHero title={resources.h1} lede={resources.lede} image="/canopy/wood-sorrel.webp">
        <p className="mt-6 max-w-[62ch] border-l-2 border-[var(--accent)] pl-4 text-[15px] leading-relaxed text-[var(--ink-2)]">{resources.caution}</p>
      </PageHero>

      <section className={`${container} grid gap-6 lg:grid-cols-12`}>
        <Reveal className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--hero-bg)] p-8 text-[var(--hero-ink)] md:p-10 lg:col-span-7">
          <Image src="/canopy/moss-light.webp" alt="" fill sizes="(min-width: 1024px) 58vw, 92vw" className="object-cover opacity-30" />
          <div className="relative">
            <Headphones size={28} weight="duotone" className="text-[var(--accent)]" />
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Mindfulness meditations from Tara Brach</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {resources.meditations.map((m) => (
                <li key={m.url}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--hero-ink)_10%,transparent)] px-4 py-3.5 font-medium backdrop-blur transition hover:bg-[color-mix(in_srgb,var(--hero-ink)_18%,transparent)]"
                  >
                    {m.label} <ArrowUpRight size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[var(--radius-lg)] bg-[var(--bg-2)] p-8 md:p-10 lg:col-span-5">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">What to do when you feel a compulsion</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {resources.compulsion.map((c) => (
              <li key={c} className="rounded-[var(--radius-md)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] leading-snug">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className={`${container} py-20 md:py-28`}>
        <h2 className={h2}>Pillars of recovery and wellness</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 2) * 0.06}>
              <Link href={`/blogs/news/${a.slug}`} className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 transition hover:border-[var(--accent)]">
                <span>
                  <span className="block text-xl font-semibold leading-snug tracking-[-0.01em]">{a.title}</span>
                  <span className="mt-3 block leading-relaxed text-[var(--ink-2)]">{a.excerpt}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  Read the article <ArrowRight size={14} weight="bold" className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="support-groups" className="scroll-mt-24 bg-[var(--bg-2)] py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <UsersThree size={30} weight="duotone" className="text-[var(--accent)]" />
            <h2 className={`${h2} mt-4`}>Support groups and community</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">{resources.supportGroupsIntro}</p>
          </div>
          <div className="grid gap-10 lg:col-span-6 lg:col-start-7">
            <LinkList items={resources.supportGroups} />
            <div>
              <h3 className="mb-3 font-semibold">Local mental-health resources</h3>
              <LinkList items={resources.local} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} grid gap-12 py-20 md:py-28 lg:grid-cols-3`}>
        <div className="lg:col-span-2">
          <BookOpen size={30} weight="duotone" className="text-[var(--accent)]" />
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Helpful books</h2>
          <div className="mt-6">
            <LinkList items={resources.books} />
          </div>
        </div>
        <div className="grid content-start gap-10">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.01em]">About eating disorders</h2>
            <div className="mt-4">
              <LinkList items={resources.learn} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.01em]">Navigating social situations</h2>
            <div className="mt-4">
              <LinkList items={resources.social} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
