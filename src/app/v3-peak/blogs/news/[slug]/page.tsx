import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ArticleBody, JsonLd, formatDate } from "@/components/shared/blocks";
import { BookButton } from "@/components/shared/booking";
import { articles } from "@/content/articles";
import { coaches } from "@/content/site";
import { href } from "@/directions/peak/paths";
import { PageBand, btnPrimary } from "@/directions/peak/ui";
import { articleJsonLd, articleMeta } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/v3-peak/blogs/news/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article ? articleMeta(article) : {};
}

const ronnie = coaches.find((c) => c.id === "ronnie")!;

// Params are read inside Suspense so the page shell renders instantly.
export default function ArticlePage({ params }: PageProps<"/v3-peak/blogs/news/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

function ArticleSkeleton() {
  return (
    <div aria-hidden>
      <div className="h-[22rem] bg-[var(--hero-bg)] md:h-[28rem]" />
      <div className="mx-auto grid max-w-[1400px] gap-4 px-4 py-16 md:px-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 max-w-[68ch] animate-pulse rounded bg-[var(--bg-2)]" style={{ width: `${70 + ((i * 13) % 30)}%` }} />
        ))}
      </div>
    </div>
  );
}

async function Article({ params }: { params: PageProps<"/v3-peak/blogs/news/[slug]">["params"] }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== slug);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <PageBand title={article.title} lede={article.date ? `${formatDate(article.date)} · Ronnie Sullivan` : "Ronnie Sullivan"} />
      <article className="mx-auto grid max-w-[1400px] gap-14 px-4 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
        <div className="prose-pip mx-auto w-full lg:mx-0">
          <ArticleBody blocks={article.blocks} />
        </div>
        <aside className="grid content-start gap-8 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[var(--radius-lg)] bg-[var(--bg-2)] p-6">
            <div className="flex items-center gap-3">
              <Image src={ronnie.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-top" />
              <div>
                <p className="font-semibold">{ronnie.name}</p>
                <p className="text-sm text-[var(--ink-2)]">{ronnie.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-2)]">{ronnie.short}</p>
            <BookButton coach="ronnie" className={`${btnPrimary} mt-5 w-full`} />
          </div>
          <div>
            <p className="font-semibold">Keep reading</p>
            <ul className="mt-3 grid gap-3">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link href={href(`/blogs/news/${a.slug}`)} className="group flex items-start gap-2 text-[var(--ink-2)] hover:text-[var(--ink)]">
                    <ArrowRight size={14} className="mt-1.5 shrink-0 transition group-hover:translate-x-0.5" />
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href={href("/blogs/news")} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
            <ArrowLeft size={14} /> All articles
          </Link>
        </aside>
      </article>
    </>
  );
}
