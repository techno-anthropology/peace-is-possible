import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Headphones, Info, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { BookButton } from "@/components/shared/booking";
import { articles } from "@/content/articles";
import { resources, type ResourceLink } from "@/content/site";
import { href } from "@/directions/peak/paths";
import { Reveal } from "@/directions/peak/Reveal";
import { ClosingCta, H2, PageBand, Section, btnPrimary } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("resources", "/pages/resource-library");

function LinkList({ items }: { items: ResourceLink[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((r) => (
        <li key={r.url}>
          <a href={r.url} target="_blank" rel="noopener" className="group flex items-start justify-between gap-4 rounded-[var(--radius-md)] bg-[var(--surface)] p-4 transition hover:bg-[var(--accent-soft)]">
            <span>
              <span className="font-medium">{r.label}</span>
              {r.note && <span className="block text-sm text-[var(--ink-2)]">{r.note}</span>}
            </span>
            <ArrowUpRight size={16} className="mt-1 shrink-0 opacity-60 transition group-hover:opacity-100" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageBand title={resources.h1} lede={resources.lede} />

      <section className="mx-auto max-w-[1400px] px-4 pt-14 md:px-10">
        <p className="flex max-w-[80ch] gap-3 text-[var(--ink-2)]">
          <Info size={22} weight="duotone" className="shrink-0 text-[var(--accent)]" />
          {resources.caution}
        </p>
      </section>

      {/* When a compulsion hits: the most urgent content first */}
      <Section>
        <H2 className="max-w-[20ch]">What to do when you feel a compulsion</H2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.compulsion.map((c, i) => (
            <Reveal key={c} delay={(i % 3) * 0.06}>
              <li className="h-full rounded-[var(--radius-md)] border border-[var(--line)] p-5 text-lg leading-snug">{c}</li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Meditations + articles */}
      <section className="bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Headphones size={28} weight="duotone" className="text-[var(--accent)]" />
              <H2 className="text-[clamp(1.5rem,2.4vw,2rem)]">Meditations from Tara Brach</H2>
            </div>
            <div className="mt-6">
              <LinkList items={resources.meditations} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <BookOpen size={28} weight="duotone" className="text-[var(--accent)]" />
              <H2 className="text-[clamp(1.5rem,2.4vw,2rem)]">Pillars of recovery and wellness</H2>
            </div>
            <ul className="mt-6 grid gap-2">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link href={href(`/blogs/news/${a.slug}`)} className="group flex items-start justify-between gap-4 rounded-[var(--radius-md)] bg-[var(--surface)] p-4 transition hover:bg-[var(--accent-soft)]">
                    <span className="font-medium">{a.title}</span>
                    <ArrowRight size={16} className="mt-1 shrink-0 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Support groups */}
      <Section id="support-groups" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <UsersThree size={28} weight="duotone" className="text-[var(--accent)]" />
              <H2>Eating disorder support groups</H2>
            </div>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-[var(--ink-2)]">{resources.supportGroupsIntro}</p>
            <BookButton className={`${btnPrimary} mt-8`} />
          </div>
          <div className="rounded-[var(--radius-lg)] bg-[var(--bg-2)] p-3 md:p-4">
            <LinkList items={resources.supportGroups} />
          </div>
        </div>
      </Section>

      {/* Books and more */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 md:grid-cols-3 md:px-10 md:py-24">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Helpful books</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {resources.books.map((b) => (
                <li key={b.url}>
                  <a href={b.url} target="_blank" rel="noopener" className="group flex h-full items-start justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--line)] p-4 transition hover:border-[var(--accent)]">
                    <span className="font-medium">{b.label}</span>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-8">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">About eating disorders</h2>
              <div className="mt-4">
                <LinkList items={resources.learn} />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Social situations</h2>
              <div className="mt-4">
                <LinkList items={resources.social} />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Local mental health</h2>
              <div className="mt-4">
                <LinkList items={resources.local} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta title="Want support putting this into practice?" body="The first step is a free phone consultation.">
        <BookButton className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
