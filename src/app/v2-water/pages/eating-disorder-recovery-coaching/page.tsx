import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  ChatTeardropText,
  ChatsCircle,
  Check,
  Compass,
  Handshake,
  Person,
  Plus,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { coaching } from "@/content/site";
import { pageMeta, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { PageIntro, primaryBtn, textLink } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";
import { to } from "@/directions/water/paths";

export const metadata: Metadata = pageMeta("coaching", "/pages/eating-disorder-recovery-coaching");

const serviceIcons: Icon[] = [ChatsCircle, ChatTeardropText, UsersThree, Person, Compass, BookOpenText, Handshake];
// Seven services in a three-column grid: 2+1, 1+1+1, 1+2.
const serviceSpans = ["lg:col-span-2", "", "", "", "", "", "lg:col-span-2"];

export default function CoachingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageIntro title={coaching.h1} lede={coaching.lede}>
        <BookButton className={primaryBtn} />
        <Link href={to("/pages/binge-eating-recovery-coaching")} className={textLink}>
          Binge eating coaching <ArrowRight size={16} />
        </Link>
      </PageIntro>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="max-w-5xl font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">{coaching.isolation}</p>
        </Reveal>
      </section>

      <section className="bg-[var(--bg-2)] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Who this coaching can help</h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-[var(--ink-2)]">{coaching.whoForNote}</p>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {coaching.whoFor.map((w, i) => (
              <Reveal as="li" key={w} delay={i * 0.04} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Check size={15} weight="bold" />
                </span>
                <span className="leading-relaxed">{w}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">What working together includes</h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coaching.services.map((s, i) => {
            const Icon = serviceIcons[i];
            const feature = i === 0;
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={(i % 3) * 0.06}
                className={`relative overflow-hidden rounded-[var(--radius-lg)] p-7 ${serviceSpans[i]} ${
                  feature ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--line)] bg-[var(--surface)]"
                }`}
              >
                {i === 6 && <Image src="/water/mist-trees.webp" alt="" fill sizes="50vw" className="object-cover opacity-25" />}
                <div className="relative">
                  <Icon size={28} className={feature ? "" : "text-[var(--accent)]"} />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className={`mt-2 max-w-[48ch] leading-relaxed ${feature ? "opacity-90" : "text-[var(--ink-2)]"}`}>{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-start gap-10 px-4 pb-24 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pb-32">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Our approach</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[var(--ink-2)]">{coaching.approach}</p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--surface)] p-7 md:p-9">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-6xl font-semibold tracking-tight">{coaching.pricing.price}</span>
            <span className="text-lg text-[var(--ink-2)]">{coaching.pricing.unit}</span>
          </p>
          <p className="mt-2 font-medium">{coaching.pricing.includes}</p>
          <p className="mt-4 leading-relaxed text-[var(--ink-2)]">{coaching.pricing.sliding}</p>
          <BookButton coach="ronnie" className={`mt-7 ${primaryBtn}`} />
        </Reveal>
      </section>

      <section className="bg-[var(--bg-2)] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <Reveal className="flex flex-wrap items-end gap-6">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Nutrition coaching with Sara</h2>
            </div>
            <BookButton coach="sara" className="rounded-full border border-[var(--line-strong)] px-5 py-3 font-semibold transition hover:bg-[var(--accent-soft)] active:scale-[0.98] md:ml-auto">
              Book with Sara
            </BookButton>
          </Reveal>
          <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {coaching.nutrition.map((n) => (
              <li key={n.name} className="grid gap-3 py-7 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-10">
                <h3 className="text-xl font-semibold tracking-tight">{n.name}</h3>
                <p className="leading-relaxed text-[var(--ink-2)]">{n.body}</p>
                <a href={n.url} target="_blank" rel="noopener" className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-semibold hover:text-[var(--accent)]">
                  {n.price} <span className="text-sm font-normal text-[var(--ink-2)]">{n.unit}</span>
                  <ArrowUpRight size={14} className="self-center" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Common questions</h2>
        </Reveal>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {coaching.faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] transition group-open:rotate-45">
                  <Plus size={14} weight="bold" />
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] leading-relaxed text-[var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-32">
        <div className="rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--surface)] p-7 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{coaching.disclaimer.title}</h2>
          <div className="mt-5 grid max-w-[75ch] gap-4 leading-relaxed text-[var(--ink-2)]">
            {coaching.disclaimer.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <BookButton className={`mt-8 ${primaryBtn}`} />
        </div>
      </section>
    </>
  );
}
