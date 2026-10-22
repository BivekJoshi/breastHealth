import type { Metadata } from "next"
import { site } from "@/content/site"
import type { Bilingual } from "@/content/types"
import { defaultLocale, locales, otherLocale, type Locale } from "./config"
import { localizePath } from "./i18n"
import { getI18n } from "./server"

/** Open Graph wants language_TERRITORY. */
const ogLocale: Record<Locale, string> = { en: "en_US", ne: "ne_NP" }

/** 1200 × 630, in public/. Shown when a page is shared on Facebook, WhatsApp, Viber… */
const shareImage = { url: "/og-image.png", width: 1200, height: 630, alt: "BreastScan.health" }

type PageMeta = {
  title: Bilingual
  description: Bilingual
  keywords?: string[]
  /** A title that already names the brand skips the layout's "· BreastScan" template. */
  absolute?: boolean
}

/**
 * Page title/description in the current language, the same for link previews,
 * plus hreflang links to the other language.
 */
export async function localizedMetadata(path: string, meta?: PageMeta): Promise<Metadata> {
  const { t, locale } = await getI18n()
  const canonical = localizePath(locale, path)
  const title = t(meta?.title ?? site.title)
  const description = t(meta?.description ?? site.description)

  return {
    ...(meta && {
      title: meta.absolute ? { absolute: title } : title,
      description,
      keywords: meta.keywords,
    }),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localizePath(l, path)])),
        "x-default": localizePath(defaultLocale, path),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: canonical,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale(locale)],
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  }
}
