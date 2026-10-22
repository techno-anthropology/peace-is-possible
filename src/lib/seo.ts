import type { Metadata } from "next";
import { coaches, coaching, home, seo, site } from "@/content/site";
import type { Article } from "@/content/articles";

type SeoKey = keyof typeof seo;

// Preview deployments must stay out of search; only production sets this.
export const indexable = process.env.SITE_INDEXABLE === "true";

// Absolute URLs for shared-link images. Vercel sets this to the production
// domain (the vercel.app one until a custom domain is attached).
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const metadataBase = new URL(productionHost ? `https://${productionHost}` : site.url);

// Child segments that set openGraph replace the root's, so every page names
// the shared image (app/opengraph-image.tsx) explicitly.
const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${home.hero.headline}` }];

// Canonicals always point at the production domain, whatever host serves the page.
export function pageMeta(key: SeoKey): Metadata {
  const { path, title, description } = seo[key];
  const url = `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export function articleMeta(article: Article): Metadata {
  const url = `${site.url}/blogs/news/${article.slug}`;
  return {
    title: { absolute: `${article.title} | Peace is Possible` },
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.excerpt, url, siteName: site.name, type: "article", images },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images },
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
