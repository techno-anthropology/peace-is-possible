import type { Metadata } from "next";
import { coaches, podcast, seo } from "@/content/site";
import { pageMeta, peopleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { PodcastEmbed } from "@/components/shared/media";
import { PageIntro, primaryBtn } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";
import { TeamCard } from "@/directions/water/TeamCard";

export const metadata: Metadata = pageMeta("coaches", "/pages/coaches");

export default function CoachesPage() {
  return (
    <>
      <JsonLd data={peopleJsonLd} />
      <PageIntro title="Our coaches" lede={seo.coaches.description} image="/water/mist-trees.webp" />

      <div className="mx-auto grid max-w-[1400px] gap-24 px-4 py-24 md:gap-36 md:px-8 md:py-32">
        {coaches.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-name`}
            className={`grid scroll-mt-28 items-start gap-10 md:grid-cols-2 md:gap-16 lg:gap-24 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="md:sticky md:top-28">
              <TeamCard coach={c} priority={i === 0} />
            </div>
            <Reveal className="md:pt-8">
              <h2 id={`${c.id}-name`} className="text-4xl font-semibold tracking-tight md:text-5xl">
                {c.name}
              </h2>
              <p className="mt-2 text-lg text-[var(--accent)]">{c.role}</p>
              <div className="mt-8 grid max-w-[60ch] gap-5 text-lg leading-relaxed text-[var(--ink-2)]">
                {c.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Focus</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {c.focus.map((f) => (
                      <span key={f} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--accent)]">
                        {f}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Background</dt>
                  <dd className="mt-3">
                    <ul className="grid gap-1.5 text-[var(--ink-2)]">
                      {c.credentials.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <BookButton coach={c.id} className={`mt-10 ${primaryBtn}`}>
                Book with {c.name.split(" ")[0]}
              </BookButton>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="bg-[var(--bg-2)] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{podcast.title}</h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-[var(--ink-2)]">{podcast.body}</p>
          <PodcastEmbed className="mt-10" />
        </div>
      </section>
    </>
  );
}
