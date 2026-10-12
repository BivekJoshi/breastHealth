import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/, uploaded to cPanel (see .github/workflows/deploy.yml).
  // Export mode rules out cacheComponents/partialPrefetching ("PPR cannot be
  // enabled in export mode") and the default image optimizer.
  output: "export",
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
};

export default nextConfig;
