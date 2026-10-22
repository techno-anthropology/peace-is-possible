import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { articles } from "@/content/articles";
import { articleMeta, articleJsonLd } from "@/lib/seo";
import { ArticleBody, JsonLd, formatDate } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { primaryBtn, textLink } from "@/directions/water/PageIntro";
import { to } from "@/directions/water/paths";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/v2-water/blogs/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article ? articleMeta(article) : {};
}

// Params are read inside Suspense so navigation can show the skeleton at once.
export default function ArticlePage({ params }: PageProps<"/v2-water/blogs/news/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8 md:pt-36" aria-hidden>
      <div className="h-4 w-28 animate-pulse rounded bg-[var(--bg-2)]" />
      <div className="mt-10 h-14 max-w-3xl animate-pulse rounded-[var(--radius-sm)] bg-[var(--bg-2)]" />
      <div className="mt-4 h-14 max-w-xl animate-pulse rounded-[var(--radius-sm)] bg-[var(--bg-2)]" />
      <div className="mt-14 grid max-w-[68ch] gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-[var(--bg-2)]" />
        ))}
      </div>
    </div>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <JsonLd data={articleJsonLd(article)} />
      <Link href={to("/blogs/news")} className={`text-sm ${textLink}`}>
        <ArrowLeft size={14} /> All articles
      </Link>
      <header className="mt-10 max-w-4xl">
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-6xl">{article.title}</h1>
        <p className="mt-6 text-[var(--ink-2)]">
          By Ronnie Sullivan
          {article.date && <> · {formatDate(article.date)}</>}
        </p>
      </header>
      <div className="prose-pip mt-14">
        <ArticleBody blocks={article.blocks} />
      </div>
      <aside className="mt-20 max-w-[68ch] rounded-[var(--radius-lg)] bg-[var(--bg-2)] p-7 md:p-10">
        <p className="text-xl font-semibold tracking-tight">Want support with this in your own recovery?</p>
        <BookButton coach="ronnie" className={`mt-6 ${primaryBtn}`} />
      </aside>
    </article>
  );
}
