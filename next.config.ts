import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  // Static HTML in out/, uploaded to cPanel (see .github/workflows/deploy.yml).
  // Export mode rules out cacheComponents/partialPrefetching ("PPR cannot be
  // enabled in export mode") and the default image optimizer.
  // Not under `next dev`: export mode turns proxy.ts off there, which leaves /
  // without its locale redirect (public/.htaccess does that job on cPanel).
  output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "export",
  // /en/book → out/en/book/index.html, which Apache serves without rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
});

export default nextConfig;
