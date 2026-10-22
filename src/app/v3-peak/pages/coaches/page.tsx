import { JsonLd } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { coaches } from "@/content/site";
import { href } from "@/directions/peak/paths";
import { Reveal } from "@/directions/peak/Reveal";
import { TeamCard } from "@/directions/peak/TeamCard";
import { ClosingCta, PageBand, Section, btnPrimary } from "@/directions/peak/ui";
import { pageMeta, peopleJsonLd } from "@/lib/seo";

export const metadata = pageMeta("coaches", "/pages/coaches");

export default function CoachesPage() {
  return (
    <>
      <JsonLd data={peopleJsonLd} />
      <PageBand title="Our coaches" lede="Eating disorder and nutrition coaching in Colorado Springs and online, from two people who recovered themselves." />

      <Section className="grid gap-24 md:gap-32">
        {coaches.map((c, i) => (
          <article key={c.id} id={c.id} className="grid scroll-mt-28 items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-16">
            <Reveal className={`w-full max-w-md md:max-w-none ${i === 1 ? "md:order-2" : ""}`}>
              <TeamCard coach={c} bioHref={c.id === "ronnie" ? href("/pages/about") : undefined} />
            </Reveal>
            <Reveal delay={0.1} className="md:pt-6">
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.03em]">{c.name}</h2>
              <p className="mt-2 text-lg text-[var(--accent)]">{c.role}</p>
              <div className="mt-6 grid max-w-[60ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
                {c.bio.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Focus</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {c.focus.map((f) => (
                      <span key={f} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm">
                        {f}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Background</dt>
                  <dd className="mt-2 grid gap-1 text-[var(--ink-2)]">
                    {c.credentials.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <BookButton coach={c.id} className={`${btnPrimary} mt-9`}>
                Book with {c.name.split(" ")[0]}
              </BookButton>
            </Reveal>
          </article>
        ))}
      </Section>

      <ClosingCta title="Not sure who to talk to?" body="Start with Ronnie. The consultation is a free phone call.">
        <BookButton className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
