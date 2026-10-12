import type { Metadata, Viewport } from "next"
import { Baloo_2, Dancing_Script, Fredoka, Nunito } from "next/font/google"
import { site } from "@/content/site"
import { locales } from "@/i18n/config"
import { getI18n, getLocale } from "@/i18n/server"
import "../globals.css"

// Headings: soft, rounded.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
})

// Body text.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

// Nepali. Neither Latin face has Devanagari, so Nepali text falls through
// to Baloo 2 — rounded to match, and it shapes Nepali (lang="ne") correctly.
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["devanagari"],
})

// A handwritten accent, used for one or two words only.
const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: "700",
})

// Both languages are prerendered as static pages.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    metadataBase: new URL(site.url),
    title: { default: t(site.title), template: `%s · ${site.name}` },
    description: t(site.description),
  }
}

export const viewport: Viewport = {
  themeColor: "#fff7fa",
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={`${fredoka.variable} ${nunito.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
