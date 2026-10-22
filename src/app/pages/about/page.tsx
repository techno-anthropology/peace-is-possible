import Image from "next/image";
import { story } from "@/content/site";
import { BookButton } from "@/components/site/booking";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { btnPrimary, container } from "@/components/site/styles";

export const metadata = pageMeta("about");

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--hero-bg)] pb-20 pt-32 text-[var(--hero-ink)] md:pb-28 md:pt-44">
        <Image src="/canopy/misty-forest.webp" alt="" fill loading="eager" fetchPriority="high" quality={60} sizes="100vw" className="-z-10 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--hero-bg)_40%,transparent)] to-[var(--hero-bg)]" />
        <div className={container}>
          <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] md:text-6xl lg:text-7xl">{story.h1}</h1>
          <p className="mt-10 max-w-[56ch] text-xl leading-relaxed text-[var(--hero-ink-2)] md:text-2xl md:leading-relaxed">{story.opening}</p>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{story.invite}</p>
        </div>
      </section>

      <section className={`${container} grid gap-14 py-20 md:py-28 lg:grid-cols-12`}>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[var(--radius-lg)]">
              <Image src="/people/ronnie.webp" alt="Ronnie Sullivan" fill sizes="(min-width: 1024px) 28vw, 80vw" className="object-cover object-top" />
            </div>
            <BookButton coach="ronnie" className={`${btnPrimary} mt-6`} />
          </div>
        </aside>
        <ol className="relative lg:col-span-7 lg:col-start-6">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--line-strong)] to-[var(--accent)]" aria-hidden />
          {story.chapters.map((c) => (
            <Reveal as="li" key={c.title} className="relative pb-16 pl-10 last:pb-0">
              <span className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" aria-hidden />
              <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{c.title}</h2>
              {c.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-5 max-w-[64ch] text-lg leading-relaxed text-[var(--ink-2)]">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
