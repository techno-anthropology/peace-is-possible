import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChatTeardropText, ChatsCircle, Plant } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { PhoneVideo, PodcastEmbed } from "@/components/shared/media";
import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { app, coaches, coaching, credentials, ctas, home, podcast, site, testimonials } from "@/content/site";
import { PeakHero } from "@/directions/peak/Hero";
import { BASE, href } from "@/directions/peak/paths";
import { Reveal } from "@/directions/peak/Reveal";
import { TeamCard } from "@/directions/peak/TeamCard";
import { H2, Section, btnGhost, btnPrimary } from "@/directions/peak/ui";
import { StillClient } from "@/directions/peak/still";
import { businessJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "/");

const stepIcons = { ChatsCircle, ChatTeardropText, Plant } as const;
const ronnie = coaches.find((c) => c.id === "ronnie")!;
const coffees = products.filter((p) => p.category === "coffee");

export default function PeakHome() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <PeakHero />

      {/* Ronnie's introduction: editorial split with portrait */}
      <Section className="grid gap-12 md:grid-cols-[1fr_1.35fr] md:items-center md:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)]">
            <Image src={ronnie.photo} alt="Ronnie Sullivan, founder of Peace is Possible" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover object-top" />
          </div>
          <p className="absolute -bottom-5 left-5 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium shadow-[0_12px_30px_-12px_rgb(8_30_20/0.35)]">
            {ronnie.name}, {ronnie.role.toLowerCase()}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <H2 className="max-w-[18ch]">{home.intro.title}</H2>
          <div className="mt-6 grid max-w-[58ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
            {home.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link href={href("/pages/about")} className={`${btnGhost} mt-8`}>
            Ronnie&apos;s story <ArrowRight size={16} weight="bold" />
          </Link>
        </Reveal>
      </Section>

      {/* How coaching works: an ascending trail of three stops */}
      <section className="relative overflow-hidden bg-[var(--bg-2)]">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
          <H2 className="max-w-[16ch]">How coaching works</H2>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute top-[12.5rem] right-[16%] left-[16%] hidden h-px origin-left -rotate-[6deg] bg-[var(--line-strong)] md:block" />
            {home.steps.map((s, i) => {
              const Icon = stepIcons[s.icon as keyof typeof stepIcons];
              return (
                <li key={s.title} className={["md:mt-40", "md:mt-20", "md:mt-0"][i]}>
                  <Reveal delay={i * 0.12} className="relative rounded-[var(--radius-lg)] bg-[var(--surface)] p-6 md:p-8">
                    <span className="grid size-12 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={24} weight="duotone" />
                    </span>
                    <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-[var(--ink-2)]">{s.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link href={href("/pages/eating-disorder-recovery-coaching")} className={btnGhost}>
              How we coach <ArrowRight size={16} weight="bold" />
            </Link>
            <p className="text-[var(--ink-2)]">
              {coaching.pricing.price} {coaching.pricing.unit}. Sliding scale available.
            </p>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <Section className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <H2>Coaches who have been there</H2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-[var(--ink-2)]">
            Ronnie recovered from bulimia, binge eating and addiction. Sara healed from bulimia. Both coach from what worked for them.
          </p>
          <Link href={href("/pages/coaches")} className={`${btnGhost} mt-8`}>
            Meet the coaches <ArrowRight size={16} weight="bold" />
          </Link>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {coaches.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} className={i === 1 ? "sm:mt-16" : ""}>
              <TeamCard coach={c} bioHref={href(c.id === "ronnie" ? "/pages/about" : "/pages/coaches")} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Local: full-bleed Pikes Peak photo */}
      <section className="relative isolate overflow-hidden">
        <Image src="/peak/pikes-garden.webp" alt="Pikes Peak above the red rocks of Garden of the Gods, Colorado Springs" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgb(8_20_14/0.82)] via-[rgb(8_20_14/0.45)] to-transparent" />
        <div className="mx-auto grid min-h-[70svh] max-w-[1400px] content-end px-4 py-16 text-[#eef5f0] md:content-center md:px-10 md:py-24">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.03] font-semibold tracking-[-0.03em]">
              In person in Colorado Springs and online
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-[#d2e0d6]">{coaching.pricing.sliding}</p>
            <BookButton className={`${btnPrimary} mt-8`} />
          </Reveal>
        </div>
      </section>

      {/* Testimonials: horizontal snap rail */}
      <section className="py-20 md:py-28">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-4 md:px-10">
          <H2 className="max-w-[14ch]">What clients say</H2>
          <Link href={href("/pages/testimonials")} className="hidden items-center gap-2 font-medium text-[var(--accent)] hover:underline sm:inline-flex">
            All testimonials <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-10 md:gap-6 md:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {testimonials.map((t) => (
            <li key={t.short} className="w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-[24rem]">
              <figure className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
                <blockquote className="font-display text-xl leading-snug font-medium tracking-tight md:text-[1.4rem]">{t.short}</blockquote>
                <figcaption className="mt-8 text-sm text-[var(--ink-2)]">{t.tag}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <Link href={href("/pages/testimonials")} className="mx-4 mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] sm:hidden">
          All testimonials <ArrowRight size={16} weight="bold" />
        </Link>
      </section>

      {/* App: phone demo */}
      <section className="bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-20 md:grid-cols-[1fr_auto] md:gap-20 md:px-10 md:py-24">
          <Reveal className="md:order-2">
            <PhoneVideo />
          </Reveal>
          <Reveal className="md:order-1">
            <H2 className="max-w-[16ch]">{app.title}</H2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-[var(--ink-2)]">{app.body}</p>
            <a href={site.appUrl} target="_blank" rel="noopener" className={`${btnPrimary} mt-8`}>
              {ctas.app} <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Podcast: wide stack */}
      <Section>
        <Reveal className="max-w-3xl">
          <H2>{podcast.title}</H2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-2)]">{podcast.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <PodcastEmbed />
        </Reveal>
      </Section>

      {/* Coffee: bento with real product photos */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-10 md:pb-28">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-5">
          <div className="col-span-2 flex flex-col justify-between rounded-[var(--radius-lg)] bg-[var(--accent)] p-7 text-[var(--accent-ink)] md:row-span-2 md:p-10">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.025em]">{home.coffee.title}</h2>
              <p className="mt-4 max-w-[40ch] text-lg leading-relaxed opacity-90">{home.coffee.body}</p>
            </div>
            <Link
              href={href("/collections/all")}
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-[var(--accent-ink)] px-6 py-3 font-semibold text-[var(--accent)] transition hover:opacity-90 active:scale-[0.98]"
            >
              {ctas.shop} <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
          {coffees.map((p) => (
            <a
              key={p.handle}
              href={p.url}
              target="_blank"
              rel="noopener"
              className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] md:aspect-auto md:min-h-60"
            >
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(6_16_11/0.8)] to-transparent p-3 pt-12 text-sm text-[#eef5f0] md:p-4 md:text-base">
                <span className="block font-semibold">{p.name}</span>
                <span className="block text-xs opacity-85 md:text-sm">{p.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Reading: editorial list */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-[0.9fr_2fr] md:px-10 md:py-28">
          <div>
            <H2>Recovery reading</H2>
            <Link href={href("/pages/resource-library")} className={`${btnGhost} mt-8`}>
              All resources <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
          <ul className="grid">
            {articles.map((a) => (
              <li key={a.slug} className="border-b border-[var(--line)] first:border-t">
                <Link href={href(`/blogs/news/${a.slug}`)} className="group grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
                  <span>
                    <span className="font-display block text-xl font-semibold tracking-tight group-hover:text-[var(--accent)] md:text-2xl">{a.title}</span>
                    <span className="mt-1.5 block max-w-[62ch] text-[var(--ink-2)]">{a.excerpt}</span>
                  </span>
                  <ArrowRight size={20} className="hidden transition group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="relative isolate overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-ink)]">
        <StillClient className="-z-20 object-cover object-[50%_60%] opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--hero-bg)]" />
        <div className="mx-auto grid min-h-[80svh] max-w-[1400px] content-end gap-8 px-4 pt-40 pb-16 md:px-10 md:pb-24">
          <h2 className="font-display max-w-[12ch] text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Peace is possible.</h2>
          <div className="flex flex-wrap items-center gap-6">
            <BookButton className={btnPrimary} />
            <ul className="flex items-center gap-3" aria-label="Credentials">
              {credentials.map((c) => (
                <li key={c.src}>
                  <Image src={c.src} alt={c.alt} title={c.alt} width={56} height={56} className="size-12 rounded-full object-cover md:size-14" />
                </li>
              ))}
            </ul>
          </div>
          <Link href={`${BASE}/pages/contact`} className="text-[var(--hero-ink-2)] underline-offset-4 hover:underline">
            Questions first? Get in touch.
          </Link>
        </div>
      </section>
    </>
  );
}
