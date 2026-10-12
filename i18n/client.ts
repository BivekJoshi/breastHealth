"use client"

import { useParams } from "next/navigation"
import { defaultLocale, isLocale } from "./config"
import { createI18n } from "./i18n"

/** Translation helpers for client components, from the [lang] route segment. */
export function useI18n() {
  const { lang } = useParams<{ lang: string }>()
  return createI18n(isLocale(lang) ? lang : defaultLocale)
}
