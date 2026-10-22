import type { NextConfig } from "next";
import { redirects, site } from "./src/content/site";

const storePaths = ["/products/:path*", "/cart/:path*", "/policies/:path*", "/account/:path*"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { qualities: [60, 75] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      ...redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })),
      // After the domain cutover, old store URLs on this domain go to Shopify.
      // While both are the same domain this would loop, so it stays off.
      ...(new URL(site.store).host === new URL(site.url).host ? [] : storePaths.map((source) => ({ source, destination: `${site.store}${source}`, permanent: false }))),
      // Prototype links were shared with the client before launch.
      { source: "/v1-canopy", destination: "/", permanent: true },
      { source: "/v1-canopy/:path+", destination: "/:path+", permanent: true },
      { source: "/v2-water/:path*", destination: "/", permanent: true },
      { source: "/v3-peak/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
