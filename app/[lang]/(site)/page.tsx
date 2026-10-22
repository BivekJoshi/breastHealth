import type { Metadata } from "next"
import { BookCta } from "@/components/common/book-cta"
import { homeMeta } from "@/content/home"
import { localizedMetadata } from "@/i18n/metadata"
import { getI18n } from "@/i18n/server"
import { AgeRange } from "@/sections/home/age-range"
import { CentresTeaser } from "@/sections/home/centres-teaser"
import { Faq } from "@/sections/home/faq"
import { Hero } from "@/sections/home/hero"
import { KnowYourBody } from "@/sections/home/know-your-body"
import { PinkOctober } from "@/sections/home/pink-october"
import { Promises } from "@/sections/home/promises"
import { Thermalytix } from "@/sections/home/thermalytix"
import { VisitTimeline } from "@/sections/home/visit-timeline"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    ...(await localizedMetadata("/")),
    title: { absolute: t(homeMeta.title) },
    description: t(homeMeta.description),
    keywords: homeMeta.keywords,
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PinkOctober />
      <Thermalytix />
      <Promises />
      <VisitTimeline />
      <AgeRange />
      <KnowYourBody />
      <CentresTeaser />
      <Faq />
      <BookCta />
    </>
  )
}
