import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { binge } from "@/content/site";
import { BookButton } from "@/components/shared/booking";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/directions/canopy/ui/page-hero";
import { Reveal } from "@/directions/canopy/ui/reveal";
import { btnPrimary, container, h2 } from "@/directions/canopy/ui/styles";

export const metadata = pageMeta("binge", "/pages/binge-eating-recovery-coaching");

export default function BingePage() {
  return (
    <>
      <PageHero title={binge.h1} lede={binge.lede} image="/canopy/moss-light.webp">
        <BookButton coach="ronnie" className={`${btnPrimary} mt-9`} />
      </PageHero>

      <section className={`${container} grid gap-16 py-16 md:py-24 lg:grid-cols-12`}>
        <div className="grid gap-16 lg:col-span-7">
          {binge.sections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[var(--ink-2)]">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)]">
              <Image src="/canopy/fern.webp" alt="" fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover" />
            </div>
            <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6">
              <h2 className="font-semibold">Sources</h2>
              <ul className="mt-3 grid gap-2.5 text-[15px]">
                {binge.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-start gap-1.5 text-[var(--ink-2)] hover:text-[var(--ink)]">
                      {s.label} <ArrowUpRight size={13} className="mt-1 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-[var(--bg-2)] py-20 md:py-28">
        <div className={container}>
          <h2 className={h2}>How Peace is Possible can support you</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {binge.support.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.08} className={`rounded-[var(--radius-lg)] bg-[var(--surface)] p-8 ${i === 0 ? "md:row-span-3 md:flex md:flex-col md:justify-end md:bg-[var(--hero-bg)] md:text-[var(--hero-ink)]" : ""}`}>
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{s.title}</h3>
                <p className={`mt-3 leading-relaxed ${i === 0 ? "text-[var(--ink-2)] md:text-lg md:text-[var(--hero-ink-2)]" : "text-[var(--ink-2)]"}`}>{s.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-[66ch] rounded-[var(--radius-md)] border border-[var(--line-strong)] p-6 leading-relaxed text-[var(--ink-2)]">{binge.limits}</p>
        </div>
      </section>

      <section className={`${container} py-24 text-center md:py-32`}>
        <p className="mx-auto max-w-[28ch] text-3xl font-semibold leading-[1.15] tracking-[-0.03em] md:text-5xl">{binge.closing}</p>
        <BookButton coach="ronnie" className={`${btnPrimary} mt-10`} />
      </section>
    </>
  );
}
