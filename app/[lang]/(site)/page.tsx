import { BookCta } from "@/components/common/book-cta"
import { JsonLd } from "@/components/common/json-ld"
import { faqs } from "@/content/faqs"
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

export async function generateMetadata() {
  return localizedMetadata("/", { ...homeMeta, absolute: true })
}

export default async function HomePage() {
  const { t } = await getI18n()
  return (
    <>
      {/* The questions and answers in the FAQ section below, for search results. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: t(f.q),
            acceptedAnswer: { "@type": "Answer", text: t(f.a) },
          })),
        }}
      />
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
