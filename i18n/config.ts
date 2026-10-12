// Shared by proxy.ts, server components and client components.

export const locales = ["en", "ne"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

/** Remembers the visitor's last choice (set by the language switch). */
export const LOCALE_COOKIE = "NEXT_LOCALE"

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale)

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ne" : "en")

/**
 * Intl locale for number formatting. Nepali asks for Devanagari digits explicitly:
 * Chrome ships without "ne" locale data and would silently fall back to Latin
 * digits, which would also mismatch the server's output during hydration.
 */
export const intlLocale: Record<Locale, string> = { en: "en-US", ne: "en-US-u-nu-deva" }

export const localeNames: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ne: { short: "ने", full: "नेपाली" },
}
