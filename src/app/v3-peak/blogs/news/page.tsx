import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { formatDate } from "@/components/shared/blocks";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { href } from "@/directions/peak/paths";
import { Reveal } from "@/directions/peak/Reveal";
import { PageBand } from "@/directions/peak/ui";

export const metadata: Metadata = {
  title: { absolute: "Recovery Articles by Ronnie | Peace is Possible" },
  description: "Articles on mindfulness, self-compassion, intention and authenticity in eating disorder recovery.",
  alternates: { canonical: `${site.url}/blogs/news` },
};

export default function BlogIndex() {
  return (
    <>
      <PageBand title="Recovery reading" lede="Articles by Ronnie on mindfulness, self-compassion, intention and authenticity in recovery." />
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-24">
        <ul className="grid gap-5 md:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
              <li>
                <Link
                  href={href(`/blogs/news/${a.slug}`)}
                  className={`group flex h-full flex-col justify-between gap-10 rounded-[var(--radius-lg)] p-7 transition md:p-10 ${
                    i === 0 ? "bg-[var(--hero-bg)] text-[var(--hero-ink)]" : "border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]"
                  }`}
                >
                  <div>
                    <p className={`text-sm ${i === 0 ? "text-[var(--hero-ink-2)]" : "text-[var(--ink-2)]"}`}>{a.date ? formatDate(a.date) : "Ronnie Sullivan"}</p>
                    <h2 className={`font-display mt-3 font-semibold tracking-tight ${i === 0 ? "max-w-[24ch] text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08]" : "text-2xl"}`}>{a.title}</h2>
                    <p className={`mt-3 max-w-[60ch] leading-relaxed ${i === 0 ? "text-lg text-[var(--hero-ink-2)]" : "text-[var(--ink-2)]"}`}>{a.excerpt}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-semibold">
                    Read <ArrowRight size={16} weight="bold" className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
