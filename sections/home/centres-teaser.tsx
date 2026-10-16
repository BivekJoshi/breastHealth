import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionIntro } from "@/components/common/section-intro"
import { centresCopy } from "@/content/home"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"
import { CityLinks, CoverageLead } from "./centres-teaser-live"

export async function CentresTeaser() {
  const { t, href } = await getI18n()

  return (
    <section aria-labelledby="centres" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid gap-12 rounded-[2.75rem] bg-blush p-7 sm:p-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div>
          <SectionIntro id="centres" copy={centresCopy} />
          {/* The numbers come from the API, so they are filled in the browser. */}
          <CoverageLead />
          <Button asChild size="xl" className="mt-8">
            <Link href={href(paths.locations)}>
              {t(centresCopy.cta)}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <CityLinks />
      </div>
    </section>
  )
}
