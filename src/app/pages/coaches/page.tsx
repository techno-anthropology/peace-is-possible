import { coaches, podcast } from "@/content/site";
import { BookButton } from "@/components/site/booking";
import { JsonLd } from "@/components/site/blocks";
import { PodcastEmbed } from "@/components/site/media";
import { pageMeta, peopleJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { TeamCard } from "@/components/site/team-card";
import { btnPrimary, container, h2, lede } from "@/components/site/styles";

export const metadata = pageMeta("coaches");

export default function CoachesPage() {
  return (
    <>
      <JsonLd data={peopleJsonLd} />
      <PageHero title="Our coaches" lede="Two coaches who have recovered from eating disorders themselves. Ronnie leads recovery coaching. Sara leads nutrition." />

      <section className={`${container} grid gap-24 pb-8 md:gap-32`}>
        {coaches.map((c, i) => (
          <article key={c.id} className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
            <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <TeamCard coach={c} preload={i === 0} />
            </Reveal>
            <Reveal delay={0.1} className={`md:col-span-6 md:pt-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
              <h2 className={h2}>{c.name}</h2>
              <p className="mt-3 text-lg text-[var(--accent)]">{c.role}</p>
              <div className="mt-8 grid gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
                {c.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-[var(--ink-3)]">Focus</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {c.focus.map((f) => (
                      <span key={f} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm">
                        {f}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-[var(--ink-3)]">Background</dt>
                  <dd className="mt-3 grid gap-1.5 text-[15px] text-[var(--ink-2)]">
                    {c.credentials.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <BookButton coach={c.id} className={`${btnPrimary} mt-10`}>
                Book with {c.name.split(" ")[0]}
              </BookButton>
            </Reveal>
          </article>
        ))}
      </section>

      <section className={`${container} pt-24 md:pt-36`}>
        <Reveal className="mx-auto max-w-[1080px]">
          <h2 className={h2}>{podcast.title}</h2>
          <p className={`${lede} mt-4`}>{podcast.body}</p>
          <PodcastEmbed className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}
