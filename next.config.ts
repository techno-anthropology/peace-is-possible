import type { NextConfig } from "next";
import { redirects } from "./src/content/site";

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
      // Prototype links were shared with the client before launch.
      { source: "/v1-canopy", destination: "/", permanent: true },
      { source: "/v1-canopy/:path+", destination: "/:path+", permanent: true },
      { source: "/v2-water/:path*", destination: "/", permanent: true },
      { source: "/v3-peak/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
