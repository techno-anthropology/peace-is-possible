import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { articles } from "@/content/articles";
import { ArticleBody, JsonLd, formatDate } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { articleJsonLd, articleMeta } from "@/lib/seo";
import { to } from "@/directions/canopy/paths";
import { btnPrimary, container } from "@/directions/canopy/ui/styles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/v1-canopy/blogs/news/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article ? articleMeta(article) : {};
}

export default function ArticlePage({ params }: PageProps<"/v1-canopy/blogs/news/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

function ArticleSkeleton() {
  return (
    <div className={`${container} max-w-[860px] pt-32 md:pt-40`} aria-hidden>
      <div className="h-4 w-28 animate-pulse rounded bg-[var(--bg-2)]" />
      <div className="mt-6 h-12 w-4/5 animate-pulse rounded-lg bg-[var(--bg-2)]" />
      <div className="mt-12 grid gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-[var(--bg-2)]" style={{ width: `${70 + ((i * 13) % 30)}%` }} />
        ))}
      </div>
    </div>
  );
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="pt-32 md:pt-40">
      <JsonLd data={articleJsonLd(article)} />
      <header className={`${container} max-w-[860px]`}>
        <Link href={to("/blogs/news")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--ink)]">
          <ArrowLeft size={14} weight="bold" /> All articles
        </Link>
        <h1 className="mt-6 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-5xl">{article.title}</h1>
        <p className="mt-5 text-[var(--ink-3)]">
          By Ronnie Sullivan{article.date ? `, ${formatDate(article.date)}` : ""}
        </p>
      </header>
      <div className={`${container} mt-12 max-w-[860px]`}>
        <div className="prose-pip">
          <ArticleBody blocks={article.blocks} />
        </div>
        <div className="mt-16 rounded-[var(--radius-lg)] bg-[var(--hero-bg)] p-8 text-[var(--hero-ink)] md:p-10">
          <p className="text-2xl font-semibold tracking-[-0.02em]">Want support putting this into practice?</p>
          <BookButton className={`${btnPrimary} mt-6`} />
        </div>
        <nav aria-label="More articles" className="mt-16 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={to(`/blogs/news/${o.slug}`)} className="rounded-[var(--radius-lg)] border border-[var(--line)] p-6 transition hover:border-[var(--accent)]">
              <span className="text-sm text-[var(--ink-3)]">Next read</span>
              <span className="mt-2 block font-semibold leading-snug">{o.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
