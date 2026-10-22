import type { MetadataRoute } from "next"
import { articlePath, articles } from "@/content/guide"
import { pageUrl, paths } from "@/content/site"
import { defaultLocale, locales } from "@/i18n/config"
import { localizePath } from "@/i18n/i18n"

// Written to out/sitemap.xml by the static export.
export const dynamic = "force-static"

// The public pages. News posts are client-rendered from the API, so they have no URL of their own to list.
const pages = [
  paths.home,
  paths.guide,
  ...articles.map((a) => articlePath(a.slug)),
  paths.screening,
  paths.locations,
  paths.book,
  paths.news,
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, pageUrl(localizePath(l, path))])),
      "x-default": pageUrl(localizePath(defaultLocale, path)),
    }
    return locales.map((l) => ({ url: pageUrl(localizePath(l, path)), alternates: { languages } }))
  })
}
