import type { MetadataRoute } from "next"
import { site } from "@/content/site"

// Written to out/robots.txt by the static export.
export const dynamic = "force-static"

// Everything stays crawlable, /api included: Google renders the centre list and news from it.
// The admin page is kept out of results by its own noindex tag, which a Disallow would hide from Google.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
