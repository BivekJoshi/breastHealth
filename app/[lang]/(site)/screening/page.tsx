import { BookCta } from "@/components/common/book-cta"
import { PageIntro } from "@/components/common/page-intro"
import { screeningPage } from "@/content/screening"
import { paths } from "@/content/site"
import { localizedMetadata } from "@/i18n/metadata"
import { AgeRange } from "@/sections/home/age-range"
import { Comparison } from "@/sections/screening/comparison"
import { HowItReads } from "@/sections/screening/how-it-reads"
import { TestDay } from "@/sections/screening/test-day"

export async function generateMetadata() {
  return localizedMetadata(paths.screening, screeningPage.meta)
}

export default function ScreeningPage() {
  return (
    <>
      <PageIntro copy={screeningPage.intro} />
      <HowItReads />
      <Comparison />
      <AgeRange />
      <TestDay />
      <BookCta />
    </>
  )
}
