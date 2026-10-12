import type { Bilingual, Title } from "@/content/types"
import { intlLocale, otherLocale, type Locale } from "./config"

/** Prefixes an app path with the locale: "/book" → "/ne/book", "/#faq" → "/ne#faq". */
export function localizePath(locale: Locale, path: string) {
  if (path === "/") return `/${locale}`
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`
  return `/${locale}${path}`
}

/** Swaps the locale segment of a pathname, e.g. "/en/locations" → "/ne/locations". */
export function switchLocalePath(pathname: string, to: Locale) {
  const [, , ...rest] = pathname.split("/")
  return `/${to}${rest.length ? `/${rest.join("/")}` : ""}`
}

export const plainTitle = (title: Title) =>
  typeof title === "string" ? title : `${title.before}${title.accent}${title.after ?? ""}`

/** Translation helpers for one locale. Works on the server and the client. */
export function createI18n(locale: Locale) {
  const altLocale = otherLocale(locale)
  const integer = new Intl.NumberFormat(intlLocale[locale], { useGrouping: false })

  return {
    locale,
    /** The other language — used for the small secondary lines. */
    altLocale,
    t: <T>(text: Bilingual<T>): T => text[locale],
    alt: <T>(text: Bilingual<T>): T => text[altLocale],
    num: (n: number, options?: Intl.NumberFormatOptions) =>
      options ? new Intl.NumberFormat(intlLocale[locale], options).format(n) : integer.format(n),
    href: (path: string) => localizePath(locale, path),
  }
}

export type I18n = ReturnType<typeof createI18n>
