import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { indexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
