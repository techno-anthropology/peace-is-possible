import type { Metadata } from "next";
import { coaches, coaching, seo, site } from "@/content/site";
import type { Article } from "@/content/articles";

type SeoKey = keyof typeof seo;

// Canonicals point at the production URL so prototype routes never compete
// with the live site. Prototypes are also noindex (see root layout).
export function pageMeta(key: SeoKey, path: string): Metadata {
  const { title, description } = seo[key];
  const url = `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", images: [{ url: site.logoFull }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function articleMeta(article: Article): Metadata {
  const url = `${site.url}/blogs/news/${article.slug}`;
  return {
    title: { absolute: `${article.title} | Peace is Possible` },
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.excerpt, url, type: "article" },
  };
}

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logoFull}`,
  image: `${site.url}${site.logoFull}`,
  description: seo.home.description,
  areaServed: [
    { "@type": "City", name: "Colorado Springs", containedInPlace: { "@type": "State", name: "Colorado" } },
    { "@type": "Country", name: "United States" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Colorado Springs", addressRegion: "CO", addressCountry: "US" },
  priceRange: "$$",
  sameAs: [site.instagram, site.facebook],
  founder: { "@id": `${site.url}/#ronnie` },
  employee: coaches.map((c) => ({ "@id": `${site.url}/#${c.id}` })),
  makesOffer: {
    "@type": "Offer",
    name: "Eating disorder recovery coaching with daily support",
    price: "100",
    priceCurrency: "USD",
    description: "Weekly one-on-one coaching session plus daily text check-ins. Sliding scale available.",
  },
};

export const peopleJsonLd = coaches.map((c) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#${c.id}`,
  name: c.name,
  jobTitle: c.role,
  image: `${site.url}${c.photo}`,
  worksFor: { "@id": `${site.url}/#business` },
  knowsAbout: c.focus,
}));

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: coaching.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    ...(article.date ? { datePublished: article.date } : {}),
    author: { "@id": `${site.url}/#ronnie` },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blogs/news/${article.slug}`,
  };
}
