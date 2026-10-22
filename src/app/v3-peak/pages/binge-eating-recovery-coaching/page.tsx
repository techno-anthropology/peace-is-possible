import { ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import { BookButton } from "@/components/shared/booking";
import { binge } from "@/content/site";
import { Reveal } from "@/directions/peak/Reveal";
import { ClosingCta, H2, PageBand, Section, btnPrimary } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("binge", "/pages/binge-eating-recovery-coaching");

export default function BingePage() {
  return (
    <>
      <PageBand title={binge.h1} lede={binge.lede}>
        <BookButton coach="ronnie" className={btnPrimary} />
      </PageBand>

      {/* Understanding: three reading blocks, heading beside text */}
      <Section className="grid gap-16">
        {binge.sections.map((s, i) => (
          <Reveal key={s.title} className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <H2 className={`text-[clamp(1.6rem,2.8vw,2.4rem)] ${i === 1 ? "md:order-2" : ""}`}>{s.title}</H2>
            <div className={`grid max-w-[64ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)] ${i === 1 ? "md:order-1" : ""}`}>
              {s.body.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </Section>

      <section className="bg-[var(--bg-2)]">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
          <H2 className="max-w-[18ch]">How Peace is Possible can support you</H2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {binge.support.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.06}
                className={`rounded-[var(--radius-lg)] p-7 md:p-9 ${i === 0 ? "bg-[var(--hero-bg)] text-[var(--hero-ink)] md:row-span-2" : "bg-[var(--surface)]"}`}
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className={`mt-3 text-lg leading-relaxed ${i === 0 ? "text-[var(--hero-ink-2)]" : "text-[var(--ink-2)]"}`}>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--line-strong)] p-6 md:p-9">
          <Info size={26} weight="duotone" className="shrink-0 text-[var(--accent)]" />
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">What coaching can and cannot do</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-2)]">{binge.limits}</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold">Sources</h2>
          <ul className="mt-3 grid gap-2">
            {binge.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-start gap-1.5 text-[var(--ink-2)] underline-offset-4 hover:text-[var(--ink)] hover:underline">
                  {s.label} <ArrowUpRight size={14} className="mt-1 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta title="You deserve support that sees the whole person" body={binge.closing}>
        <BookButton coach="ronnie" className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
