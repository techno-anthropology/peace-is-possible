import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChatsCircle, ChatTeardropText, Plant } from "@phosphor-icons/react/dist/ssr";
import { app, coaches, coaching, credentials, ctas, home, podcast, seo, site, testimonials } from "@/content/site";
import { products } from "@/content/products";
import { articles } from "@/content/articles";
import { BookButton } from "@/components/shared/booking";
import { PhoneVideo, PodcastEmbed } from "@/components/shared/media";
import { formatDate } from "@/components/shared/blocks";
import { Reveal } from "./Reveal";
import { TeamCard } from "./TeamCard";
import { to } from "./paths";

const stepIcons = { ChatsCircle, ChatTeardropText, Plant } as const;

const linkCls = "inline-flex items-center gap-1.5 font-medium text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]";

export function Intro() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-12 overflow-x-clip px-4 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-8 md:py-36">
      <Reveal className="relative mx-auto aspect-square w-full max-w-[26rem]">
        <div className="water-rings absolute -inset-[18%] rounded-full" aria-hidden />
        <div className="relative size-full overflow-hidden rounded-full">
          <Image src="/people/ronnie.webp" alt="Ronnie Sullivan, founder of Peace is Possible" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-cover object-top" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{home.intro.title}</h2>
        <div className="mt-6 grid max-w-[60ch] gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
          {home.intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href={to("/pages/about")} className={`mt-8 ${linkCls}`}>
          Read Ronnie&apos;s story <ArrowRight size={16} />
        </Link>
        <ul className="mt-12 flex items-center gap-5" aria-label="Credentials">
          {credentials.map((c) => (
            <li key={c.src}>
              <Image src={c.src} alt={c.alt} width={72} height={72} className="size-16 rounded-full object-cover md:size-[4.5rem]" />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

// Three stepping stones down the page, offset like stones across water.
export function Steps() {
  const offsets = ["md:ml-0", "md:ml-[22%]", "md:ml-[44%]"];
  return (
    <section className="bg-[var(--bg-2)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">What our work together looks like</h2>
        <ol className="relative mt-14 grid gap-10 md:mt-20 md:gap-6">
          {home.steps.map((s, i) => {
            const Icon = stepIcons[s.icon as keyof typeof stepIcons];
            return (
              <Reveal as="li" key={s.title} delay={i * 0.08} className={`flex max-w-xl items-start gap-5 ${offsets[i]}`}>
                <span className="water-rings grid size-20 shrink-0 place-items-center rounded-full md:size-24">
                  <span className="grid size-14 place-items-center rounded-full bg-[var(--surface)] text-[var(--accent)] shadow-[0_10px_30px_-15px_rgb(10_40_25/0.5)] md:size-16">
                    <Icon size={28} />
                  </span>
                </span>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--ink-2)]">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="mt-16 flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 md:mt-24 md:flex-row md:items-center md:p-8">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold tracking-tight">{coaching.pricing.price}</span>
            <span className="text-[var(--ink-2)]">{coaching.pricing.unit}</span>
          </p>
          <p className="max-w-xl leading-relaxed text-[var(--ink-2)] md:border-l md:border-[var(--line)] md:pl-6">
            {coaching.pricing.includes}. {coaching.pricing.sliding}
          </p>
          <Link href={to("/pages/eating-disorder-recovery-coaching")} className={`md:ml-auto ${linkCls} whitespace-nowrap`}>
            How coaching works <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function CoachesTeaser() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Our coaches</h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[var(--ink-2)]">{seo.coaches.description}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12 lg:px-[6%]">
        {coaches.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1} className={i === 1 ? "md:mt-28" : ""}>
            <TeamCard coach={c} bioLink />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialRow() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end gap-4 px-4 md:px-8">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">What clients say</h2>
        <Link href={to("/pages/testimonials")} className={`ml-auto ${linkCls}`}>
          All testimonials <ArrowRight size={16} />
        </Link>
      </div>
      <ul className="water-scroll-row mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-8 md:px-8 xl:px-[max(2rem,calc((100vw-1400px)/2+2rem))]">
        {testimonials.map((t, i) => (
          <li
            key={i}
            className={`flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[var(--radius-lg)] p-7 sm:w-[24rem] md:p-8 ${
              i % 3 === 0 ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"
            }`}
          >
            <p className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">{t.short}</p>
            <p className={`mt-8 text-sm ${i % 3 === 0 ? "opacity-80" : "text-[var(--ink-2)]"}`}>{t.tag}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AppSection() {
  return (
    <section className="px-4 md:px-8">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-16 md:py-20">
        <Reveal>
          <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{app.title}</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-[var(--ink-2)]">{app.body}</p>
          <a
            href={site.appUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]"
          >
            {ctas.app} <ArrowUpRight size={18} weight="bold" />
          </a>
        </Reveal>
        <PhoneVideo />
      </div>
    </section>
  );
}

export function Podcast() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <Reveal className="mx-auto max-w-5xl">
        <PodcastEmbed />
        <div className="mt-8 grid gap-3 md:grid-cols-[1fr_1.2fr] md:gap-10">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl">{podcast.title}</h2>
          <p className="text-lg leading-relaxed text-[var(--ink-2)]">{podcast.body}</p>
        </div>
      </Reveal>
    </section>
  );
}

// Text cell + four coffees: five cells over two rows (2+1+1, then 2+2).
export function CoffeeTeaser() {
  const coffees = products.filter((p) => p.category === "coffee");
  const spans = ["", "", "md:col-span-2", "md:col-span-2"];
  return (
    <section className="bg-[var(--bg-2)] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-4 px-4 md:auto-rows-[minmax(16rem,auto)] md:grid-cols-4 md:px-8">
        <Reveal className="flex flex-col justify-between rounded-[var(--radius-lg)] bg-[var(--accent)] p-7 text-[var(--accent-ink)] md:col-span-2 md:p-9">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{home.coffee.title}</h2>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed opacity-90">{home.coffee.body}</p>
          </div>
          <Link href={to("/collections/all#coffee")} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--ink)] transition hover:brightness-105 active:scale-[0.98]">
            {ctas.shop} <ArrowRight size={16} weight="bold" />
          </Link>
        </Reveal>
        {coffees.map((p, i) => (
          <Link
            key={p.handle}
            href={to("/collections/all#coffee")}
            className={`group relative min-h-[14rem] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface)] ${spans[i]}`}
          >
            <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
            <span className="absolute inset-x-3 bottom-3 rounded-[var(--radius-sm)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur">
              <span className="block font-semibold">{p.name}</span>
              <span className="block text-sm text-[var(--ink-2)]">{p.sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ArticlesTeaser() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-36">
      <Reveal>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Pillars of recovery and wellness</h2>
        <Link href={to("/pages/resource-library")} className={`mt-8 ${linkCls}`}>
          Resource library <ArrowRight size={16} />
        </Link>
      </Reveal>
      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={to(`/blogs/news/${a.slug}`)} className="group grid gap-2 py-7 md:grid-cols-[1fr_auto] md:gap-8">
              <span>
                <span className="block text-xl font-semibold leading-snug tracking-tight transition group-hover:text-[var(--accent)] md:text-2xl">{a.title}</span>
                <span className="mt-2 block leading-relaxed text-[var(--ink-2)]">{a.excerpt}</span>
              </span>
              {a.date && <span className="text-sm text-[var(--ink-3)] md:pt-2">{formatDate(a.date)}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src="/water/pond-trees.webp" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_70%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hero-bg)] via-[var(--hero-bg)]/80 to-[var(--hero-bg)]/20" />
      <div className="mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col justify-center px-4 py-24 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--hero-ink)] md:text-6xl">Peace is possible.</h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[var(--hero-ink-2)]">
            The first step is a free phone consultation with Ronnie for eating disorders, or with Sara for nutrition.
          </p>
          <BookButton className="mt-8 rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]" />
        </Reveal>
      </div>
    </section>
  );
}
