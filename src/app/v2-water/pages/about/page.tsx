import type { Metadata } from "next";
import Image from "next/image";
import { story } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { BookButton } from "@/components/shared/booking";
import { primaryBtn } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";

export const metadata: Metadata = pageMeta("about", "/pages/about");

// Ronnie's story, word for word. The chapters run down a quiet timeline of
// ripple markers next to his portrait.
export default function StoryPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden">
        <Image src="/water/mist-lake.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg)]/70 via-[var(--bg)]/85 to-[var(--bg)]" />
        <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
          <h1 className="text-5xl font-semibold tracking-[-0.03em] md:text-7xl">{story.h1}</h1>
          <p className="mt-10 max-w-4xl font-display text-xl font-medium leading-relaxed tracking-tight md:text-3xl md:leading-snug">{story.opening}</p>
          <p className="mt-8 text-xl font-semibold text-[var(--accent)] md:text-2xl">{story.invite}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 pb-24 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:px-8 md:pb-32">
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[var(--radius-lg)]">
            <Image src="/people/ronnie.webp" alt="Ronnie Sullivan" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-top" />
          </div>
          <BookButton coach="ronnie" className={`mt-6 hidden md:inline-block ${primaryBtn}`} />
        </aside>

        <ol className="relative border-l border-[var(--line-strong)] pl-8 md:pl-12">
          {story.chapters.map((ch) => (
            <Reveal as="li" key={ch.title} className="relative pb-14 last:pb-0">
              <span aria-hidden className="water-rings absolute -left-[3.28rem] top-0 grid size-10 place-items-center rounded-full md:-left-[4.28rem]">
                <span className="size-3 rounded-full bg-[var(--accent)]" />
              </span>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{ch.title}</h2>
              <div className="mt-4 grid max-w-[64ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
                {ch.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
          <li className="pt-10">
            <BookButton coach="ronnie" className={primaryBtn} />
          </li>
        </ol>
      </div>
    </>
  );
}
