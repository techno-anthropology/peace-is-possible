import type { MetadataRoute } from "next";
import { seo, site } from "@/content/site";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.values(seo).map((page) => ({ url: `${site.url}${page.path}` })),
    ...articles.map((a) => ({
      url: `${site.url}/blogs/news/${a.slug}`,
      ...(a.date ? { lastModified: a.date } : {}),
    })),
  ];
}
