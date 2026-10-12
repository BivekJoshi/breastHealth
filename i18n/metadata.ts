import type { Metadata } from "next"
import type { Bilingual } from "@/content/types"
import { defaultLocale, locales } from "./config"
import { localizePath } from "./i18n"
import { getI18n } from "./server"

/** Page title/description in the current language, plus hreflang links to the other one. */
export async function localizedMetadata(
  path: string,
  meta?: { title: Bilingual; description: Bilingual }
): Promise<Metadata> {
  const { t, locale } = await getI18n()
  return {
    ...(meta && { title: t(meta.title), description: t(meta.description) }),
    alternates: {
      canonical: localizePath(locale, path),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localizePath(l, path)])),
        "x-default": localizePath(defaultLocale, path),
      },
    },
  }
}
