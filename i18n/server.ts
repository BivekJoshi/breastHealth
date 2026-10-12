import { notFound } from "next/navigation"
import { lang } from "next/root-params"
import { isLocale, type Locale } from "./config"
import { createI18n } from "./i18n"

/** The current locale, read from the [lang] root segment. Server components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang()
  if (!isLocale(value)) notFound()
  return value
}

export async function getI18n() {
  return createI18n(await getLocale())
}
