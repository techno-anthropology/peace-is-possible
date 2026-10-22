import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { binge, coaches } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { BookButton } from "@/components/shared/booking";
import { PageIntro, primaryBtn, textLink } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";
import { to } from "@/directions/water/paths";

export const metadata: Metadata = pageMeta("binge", "/pages/binge-eating-recovery-coaching");

export default function BingePage() {
  const ronnie = coaches.find((c) => c.id === "ronnie")!;
  const sara = coaches.find((c) => c.id === "sara")!;
  const supportPhotos = [ronnie.photo, null, null, sara.photo];

  return (
    <>
      <PageIntro title={binge.h1} lede={binge.lede} image="/water/pond-dawn.webp">
        <BookButton coach="ronnie" className={primaryBtn} />
        <Link href={to("/pages/eating-disorder-recovery-coaching")} className={textLink}>
          All coaching <ArrowRight size={16} />
        </Link>
      </PageIntro>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <div className="grid gap-16 md:gap-24">
          {binge.sections.map((s, i) => (
            <Reveal key={s.title} className={`grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 ${i === 1 ? "rounded-[var(--radius-lg)] bg-[var(--bg-2)] p-7 md:p-12" : ""}`}>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{s.title}</h2>
              <div className="grid max-w-[62ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {i === 1 && (
                  <ul className="mt-2 grid gap-2 text-sm">
                    {binge.sources.map((src) => (
                      <li key={src.url}>
                        <a href={src.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--ink)]">
                          {src.label} <ArrowUpRight size={12} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg-2)] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">How Peace is Possible can support you</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {binge.support.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 2) * 0.08} className="flex gap-5 rounded-[var(--radius-lg)] bg-[var(--surface)] p-6 md:p-8">
                {supportPhotos[i] && (
                  <Image src={supportPhotos[i]!} alt="" width={72} height={72} className="size-16 shrink-0 rounded-full object-cover object-top md:size-[4.5rem]" />
                )}
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--ink-2)]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-[70ch] rounded-[var(--radius-md)] border border-[var(--line-strong)] p-6 leading-relaxed text-[var(--ink-2)]">{binge.limits}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">{binge.closing}</p>
          <BookButton coach="ronnie" className={`mt-8 ${primaryBtn}`} />
        </Reveal>
      </section>
    </>
  );
}
