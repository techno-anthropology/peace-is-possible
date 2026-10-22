import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChatTeardropText, ChatsCircle, Plant } from "@phosphor-icons/react/dist/ssr";
import { app, binge, coaches, credentials, ctas, home, podcast, resources, site, testimonials } from "@/content/site";
import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { BookButton } from "./booking";
import { PhoneVideo, PodcastEmbed } from "./media";
import { Reveal } from "./reveal";
import { TeamCard } from "./team-card";
import { btnGhost, btnPrimary, container, h2, lede, textLink } from "./styles";


const stepIcons = { ChatsCircle, ChatTeardropText, Plant } as const;

export function Intro() {
  return (
    <section className={`${container} grid items-center gap-12 py-24 md:grid-cols-12 md:gap-10 md:py-36`}>
      <Reveal className="relative md:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)]">
          <Image
            src="/people/ronnie.webp"
            alt="Ronnie Sullivan, founder of Peace is Possible"
            fill
            sizes="(min-width: 768px) 40vw, 92vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute -bottom-8 -right-4 hidden aspect-square w-40 overflow-hidden rounded-[var(--radius-md)] border-4 border-[var(--bg)] sm:block lg:-right-10 lg:w-48">
          <Image src="/canopy/fern.webp" alt="" fill sizes="200px" className="object-cover" />
        </div>
      </Reveal>
      <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
        <h2 className={h2}>{home.intro.title}</h2>
        <div className="mt-6 grid gap-4 text-lg leading-relaxed text-[var(--ink-2)]">
          {home.intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href={"/pages/about"} className={`${textLink} mt-8`}>
          Read Ronnie&apos;s story <ArrowRight size={16} weight="bold" />
        </Link>
        <ul className="mt-12 flex items-center gap-4 border-t border-[var(--line)] pt-8" aria-label="Credentials">
          {credentials.map((c) => (
            <li key={c.src}>
              <Image src={c.src} alt={c.alt} width={72} height={72} className="size-16 rounded-full object-contain md:size-[72px]" />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Steps() {
  return (
    <section className="bg-[var(--bg-2)] py-24 md:py-36">
      <div className={`${container} grid gap-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">How coaching works</p>
            <h2 className={`${h2} mt-4`}>What working together looks like</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className={btnPrimary} />
              <Link href={"/pages/eating-disorder-recovery-coaching"} className={btnGhost}>
                Coaching details
              </Link>
            </div>
          </div>
        </div>
        <ol className="relative md:col-span-6 md:col-start-7">
          <span className="absolute bottom-6 left-[27px] top-6 w-px bg-[var(--line-strong)]" aria-hidden />
          {home.steps.map((s, i) => {
            const Icon = stepIcons[s.icon as keyof typeof stepIcons];
            return (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative flex gap-6 pb-14 last:pb-0">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--accent)]">
                  <Icon size={26} weight="duotone" />
                </span>
                <div className="pt-2.5">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-[var(--ink-2)]">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function CoachesTeaser() {
  return (
    <section className={`${container} grid items-end gap-10 py-24 md:py-36 lg:grid-cols-12`}>
      <Reveal className="lg:col-span-4 lg:pb-8">
        <h2 className={h2}>Coaches who have been there</h2>
        <p className={`${lede} mt-5`}>
          Ronnie and Sara both recovered from eating disorders. They coach from what worked for them.
        </p>
        <Link href={"/pages/coaches"} className={`${textLink} mt-8`}>
          Meet the coaches <ArrowRight size={16} weight="bold" />
        </Link>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
        {coaches.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1} className={i === 1 ? "sm:mt-16" : ""}>
            <TeamCard coach={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Voices() {
  const row = testimonials.filter((t) => t.tag !== "Coffee customer");
  return (
    <section className="overflow-hidden border-y border-[var(--line)] py-20 md:py-28">
      <div className={`${container} flex flex-wrap items-end justify-between gap-6`}>
        <h2 className={h2}>What clients say</h2>
        <Link href={"/pages/testimonials"} className={textLink}>
          All testimonials <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
      <div className={`cn-marqueeWrap mt-12`}>
        <ul className={`cn-marquee gap-5 pl-5`}>
          {[...row, ...row].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= row.length}
              className="w-[min(82vw,26rem)] shrink-0 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-7"
            >
              <p className="text-xl font-medium leading-snug tracking-[-0.01em]">{t.short}</p>
              <p className="mt-5 text-sm text-[var(--ink-3)]">{t.tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AppSection() {
  return (
    <section className={`${container} py-24 md:py-36`}>
      <div className="relative overflow-hidden rounded-[calc(var(--radius-lg)*1.5)] bg-[var(--hero-bg)] text-[var(--hero-ink)]">
        <Image src="/canopy/moss-light.webp" alt="" fill sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hero-bg)] via-[color-mix(in_srgb,var(--hero-bg)_80%,transparent)] to-[color-mix(in_srgb,var(--hero-bg)_30%,transparent)]" />
        <div className="relative grid items-center gap-12 px-6 py-14 md:grid-cols-2 md:px-14 md:py-20 lg:px-20">
          <Reveal>
            <h2 className={h2}>{app.title}</h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-[var(--hero-ink-2)]">{app.body}</p>
            <a href={site.appUrl} target="_blank" rel="noopener" className={`${btnPrimary} mt-8`}>
              {ctas.app} <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>
          <PhoneVideo />
        </div>
      </div>
    </section>
  );
}

export function Podcast() {
  return (
    <section className={`${container} pb-24 md:pb-36`}>
      <Reveal className="mx-auto max-w-[1080px]">
        <h2 className={h2}>{podcast.title}</h2>
        <p className={`${lede} mt-4`}>{podcast.body}</p>
        <PodcastEmbed className="mt-10" />
      </Reveal>
    </section>
  );
}

export function Explore() {
  const coffee = products.find((p) => p.handle === "colombia-huila-copy") ?? products[0];
  const [a1, a2] = articles;
  return (
    <section className="bg-[var(--bg-2)] py-24 md:py-36">
      <div className={container}>
        <h2 className={`${h2} max-w-[18ch]`}>Keep going between sessions</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto] md:gap-5">
          <Reveal className="md:col-span-2 md:row-span-2">
            <Link
              href={"/collections/all"}
              className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface)] p-7 md:p-9"
            >
              <Image src={coffee.image} alt="A bag of Recovery Blend coffee" fill sizes="(min-width: 768px) 50vw, 92vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[rgb(5_18_11/0.85)] via-[rgb(5_18_11/0.2)] to-transparent" />
              <span className="relative text-[#eef5f0]">
                <span className="block text-3xl font-semibold tracking-[-0.02em]">{home.coffee.title}</span>
                <span className="mt-3 block max-w-[40ch] text-[#cfe0d4]">{home.coffee.body}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                  {ctas.shop} <ArrowRight size={16} weight="bold" />
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.08}>
            <Link
              href={"/pages/resource-library"}
              className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] p-7"
            >
              <Image src="/canopy/wood-sorrel.webp" alt="" fill sizes="(min-width: 768px) 50vw, 92vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[rgb(5_18_11/0.85)] to-[rgb(5_18_11/0.1)]" />
              <span className="relative text-[#eef5f0]">
                <span className="block text-2xl font-semibold tracking-[-0.02em]">{resources.h1}</span>
                <span className="mt-2 block max-w-[44ch] text-[#cfe0d4]">{resources.lede}</span>
              </span>
            </Link>
          </Reveal>
          {[a1, a2].map((a, i) => (
            <Reveal key={a.slug} delay={0.12 + i * 0.06}>
              <Link
                href={`/blogs/news/${a.slug}`}
                className={`group flex h-full min-h-[15rem] flex-col justify-between rounded-[var(--radius-lg)] p-7 transition ${
                  i === 0 ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"
                }`}
              >
                <span className="text-xl font-semibold leading-snug tracking-[-0.01em]">{a.title.split(":")[0]}</span>
                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${i === 0 ? "" : "text-[var(--accent)]"}`}>
                  Read the article <ArrowRight size={14} weight="bold" className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  const [first, second] = binge.closing.split(". ");
  return (
    <section className="relative isolate overflow-hidden bg-[var(--hero-bg)] py-32 text-[var(--hero-ink)] md:py-48">
      <Image src="/canopy/misty-forest.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--hero-bg)] via-[color-mix(in_srgb,var(--hero-bg)_40%,transparent)] to-[var(--hero-bg)]" />
      <Reveal className={`${container} text-center`}>
        <p className="mx-auto max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] md:text-6xl">{first}.</p>
        <p className="mx-auto mt-6 max-w-[44ch] text-lg leading-relaxed text-[var(--hero-ink-2)]">{second}</p>
        <BookButton className={`${btnPrimary} mt-10`} />
      </Reveal>
    </section>
  );
}
