import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle, Info, Plus } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { coaching } from "@/content/site";
import { href } from "@/directions/peak/paths";
import { Reveal } from "@/directions/peak/Reveal";
import { ClosingCta, H2, PageBand, Section, btnGhost, btnPrimary } from "@/directions/peak/ui";
import { faqJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("coaching", "/pages/eating-disorder-recovery-coaching");

export default function CoachingPage() {
  const [first, ...rest] = coaching.services;
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageBand title={coaching.h1} lede={coaching.lede}>
        <div className="flex flex-wrap items-center gap-4">
          <BookButton className={btnPrimary} />
          <span className="text-[var(--hero-ink-2)]">
            {coaching.pricing.price} {coaching.pricing.unit}, sliding scale available
          </span>
        </div>
      </PageBand>

      {/* Who it helps: statement + grouped checklist */}
      <Section className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.2] font-medium tracking-[-0.02em]">{coaching.isolation}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <H2 className="text-[clamp(1.5rem,2.4vw,2rem)]">Coaching can help if</H2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {coaching.whoFor.map((w) => (
              <li key={w} className="flex gap-3 rounded-[var(--radius-md)] bg-[var(--bg-2)] p-4 leading-snug">
                <CheckCircle size={22} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[60ch] leading-relaxed text-[var(--ink-2)]">{coaching.whoForNote}</p>
        </Reveal>
      </Section>

      {/* What's included: bento with the approach as the anchor tile */}
      <section className="bg-[var(--bg-2)]">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
          <H2 className="max-w-[18ch]">What working together looks like</H2>
          <div className="mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
            <div className="rounded-[var(--radius-lg)] bg-[var(--hero-bg)] p-7 text-[var(--hero-ink)] md:col-span-2 md:row-span-2 md:p-9">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{first.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--hero-ink-2)]">{first.body}</p>
              <p className="mt-8 border-t border-[color-mix(in_srgb,var(--hero-ink)_15%,transparent)] pt-6 leading-relaxed text-[var(--hero-ink-2)]">{coaching.approach}</p>
            </div>
            {rest.map((s, i) => (
              <div key={s.title} className={`rounded-[var(--radius-lg)] bg-[var(--surface)] p-6 ${i === rest.length - 1 ? "md:col-span-2" : ""}`}>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{s.body}</p>
              </div>
            ))}
          </div>
          <Link href={href("/pages/binge-eating-recovery-coaching")} className="mt-10 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline">
            More on binge eating recovery coaching <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <Section className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <Reveal className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 md:p-10">
          <p className="text-[var(--ink-2)]">Recovery coaching with Ronnie</p>
          <p className="font-display mt-3 text-6xl font-semibold tracking-tight">
            {coaching.pricing.price}
            <span className="ml-2 text-xl font-medium text-[var(--ink-2)]">{coaching.pricing.unit}</span>
          </p>
          <p className="mt-3 font-medium">{coaching.pricing.includes}</p>
          <p className="mt-5 leading-relaxed text-[var(--ink-2)]">{coaching.pricing.sliding}</p>
          <BookButton coach="ronnie" className={`${btnPrimary} mt-8`} />
        </Reveal>
        <Reveal delay={0.1}>
          <H2 className="text-[clamp(1.5rem,2.4vw,2rem)]">Nutrition coaching with Sara</H2>
          <ul className="mt-6 grid gap-3">
            {coaching.nutrition.map((n) => (
              <li key={n.name}>
                <a href={n.url} target="_blank" rel="noopener" className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-[var(--radius-md)] bg-[var(--bg-2)] p-5 transition hover:bg-[var(--accent-soft)]">
                  <span className="font-semibold">
                    {n.name} <ArrowUpRight size={14} className="inline opacity-60" />
                  </span>
                  <span className="font-display text-xl font-semibold">
                    {n.price} <span className="text-sm font-normal text-[var(--ink-2)]">{n.unit}</span>
                  </span>
                  <span className="w-full text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{n.body}</span>
                </a>
              </li>
            ))}
          </ul>
          <BookButton coach="sara" className={`${btnGhost} mt-6`}>
            Book with Sara
          </BookButton>
        </Reveal>
      </Section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--line-strong)] p-6 md:p-9">
          <Info size={26} weight="duotone" className="shrink-0 text-[var(--accent)]" />
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{coaching.disclaimer.title}</h2>
            {coaching.disclaimer.body.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 max-w-[78ch] leading-relaxed text-[var(--ink-2)]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr]">
        <H2>Questions</H2>
        <div className="grid">
          {coaching.faq.map((f) => (
            <details key={f.q} className="group border-b border-[var(--line)] first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={18} weight="bold" className="shrink-0 transition group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-6 leading-relaxed text-[var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <ClosingCta body="The first step is a free phone consultation.">
        <BookButton className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
