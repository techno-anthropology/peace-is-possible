import Link from "next/link";
import { ArrowRight, ArrowUpRight, CaretDown, Info } from "@phosphor-icons/react/dist/ssr";
import { coaching } from "@/content/site";
import { BookButton } from "@/components/site/booking";
import { JsonLd } from "@/components/site/blocks";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { btnPrimary, container, h2, textLink } from "@/components/site/styles";

export const metadata = pageMeta("coaching", "/pages/eating-disorder-recovery-coaching");

export default function CoachingPage() {
  const half = Math.ceil(coaching.whoFor.length / 2);
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero title={coaching.h1} lede={coaching.lede}>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <BookButton className={btnPrimary} />
          <Link href={"/pages/binge-eating-recovery-coaching"} className={textLink}>
            Binge eating coaching <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </PageHero>

      <section className={`${container} py-16 md:py-24`}>
        <Reveal>
          <p className="max-w-[30ch] text-3xl font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.75rem]">
            {coaching.isolation.split(". ").slice(0, 2).join(". ")}.
          </p>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--ink-2)]">{coaching.isolation.split(". ").slice(2).join(". ")}</p>
        </Reveal>
      </section>

      <section className="bg-[var(--bg-2)] py-20 md:py-28">
        <div className={container}>
          <h2 className={h2}>Who this coaching can help</h2>
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {[coaching.whoFor.slice(0, half), coaching.whoFor.slice(half)].map((col, c) => (
              <ul key={c} className="grid content-start gap-3">
                {col.map((item) => (
                  <li key={item} className="rounded-[var(--radius-md)] bg-[var(--surface)] px-5 py-4 text-[17px] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-[var(--ink-2)]">{coaching.whoForNote}</p>
        </div>
      </section>

      <section className={`${container} py-20 md:py-28`}>
        <h2 className={h2}>What working together looks like</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6 md:gap-5">
          {coaching.services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 3) * 0.06}
              className={`rounded-[var(--radius-lg)] p-7 ${
                i < 2 ? "bg-[var(--accent)] text-[var(--accent-ink)] md:col-span-3" : i < 5 ? "border border-[var(--line)] bg-[var(--surface)] md:col-span-2" : "border border-[var(--line)] bg-[var(--surface)] md:col-span-3"
              }`}
            >
              <h3 className="text-xl font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className={`mt-3 leading-relaxed ${i < 2 ? "opacity-85" : "text-[var(--ink-2)]"}`}>{s.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 max-w-[66ch] text-lg leading-relaxed text-[var(--ink-2)]">{coaching.approach}</p>
      </section>

      <section className="bg-[var(--bg-2)] py-20 md:py-28">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <Reveal className="rounded-[calc(var(--radius-lg)*1.25)] bg-[var(--hero-bg)] p-8 text-[var(--hero-ink)] md:p-10 lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Recovery coaching with Ronnie</h2>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-6xl font-semibold tracking-[-0.04em]">{coaching.pricing.price}</span>
              <span className="text-[var(--hero-ink-2)]">{coaching.pricing.unit}</span>
            </p>
            <p className="mt-2 text-[var(--hero-ink-2)]">{coaching.pricing.includes}</p>
            <p className="mt-6 border-t border-[color-mix(in_srgb,var(--hero-ink)_15%,transparent)] pt-6 leading-relaxed text-[var(--hero-ink-2)]">{coaching.pricing.sliding}</p>
            <BookButton coach="ronnie" className={`${btnPrimary} mt-8 w-full`} />
          </Reveal>
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Nutrition coaching with Sara</h2>
            <ul className="mt-6 grid gap-3">
              {coaching.nutrition.map((n) => (
                <li key={n.name}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener"
                    className="group grid gap-2 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
                  >
                    <span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        {n.name} <ArrowUpRight size={14} className="opacity-50 transition group-hover:opacity-100" />
                      </span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-[var(--ink-2)]">{n.body}</span>
                    </span>
                    <span className="whitespace-nowrap text-right">
                      <span className="text-xl font-semibold">{n.price}</span> <span className="text-sm text-[var(--ink-3)]">{n.unit}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <BookButton coach="sara" className={`${textLink} mt-6`}>
              Book a free call with Sara <ArrowRight size={16} weight="bold" />
            </BookButton>
          </div>
        </div>
      </section>

      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <h2 className={h2}>Questions</h2>
          <div className="mt-8 flex gap-4 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6">
            <Info size={22} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <div>
              <h3 className="font-semibold">{coaching.disclaimer.title}</h3>
              {coaching.disclaimer.body.map((p) => (
                <p key={p} className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:col-span-7">
          {coaching.faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <CaretDown size={18} className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-[var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
