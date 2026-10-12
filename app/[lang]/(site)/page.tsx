import { BookCta } from "@/components/common/book-cta"
import { localizedMetadata } from "@/i18n/metadata"
import { AgeRange } from "@/sections/home/age-range"
import { CentresTeaser } from "@/sections/home/centres-teaser"
import { Faq } from "@/sections/home/faq"
import { Hero } from "@/sections/home/hero"
import { KnowYourBody } from "@/sections/home/know-your-body"
import { Promises } from "@/sections/home/promises"
import { VisitTimeline } from "@/sections/home/visit-timeline"

export async function generateMetadata() {
  return localizedMetadata("/")
}

export default function HomePage() {
  return (
    <>
      <Hero />
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
