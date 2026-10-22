import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, House, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/common/page-intro"
import { locationsPage } from "@/content/locations"
import { paths } from "@/content/site"
import { CentresJsonLd } from "@/features/locations/centres-json-ld"
import { LocationFinder } from "@/features/locations/location-finder"
import { LocationFinderFromUrl } from "@/features/locations/location-finder-from-url"
import { localizedMetadata } from "@/i18n/metadata"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

export async function generateMetadata() {
  return localizedMetadata(paths.locations, locationsPage.meta)
}

const awayLook = {
  home: { icon: House, tone: "bg-blush text-rose" },
  camp: { icon: Users, tone: "bg-lilac text-lilac-deep" },
}

export default async function LocationsPage() {
  const { t, href } = await getI18n()
  const { away } = locationsPage

  return (
    <>
      <CentresJsonLd />
      <PageIntro copy={locationsPage.intro} />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        {/* The fallback is the full, unfiltered finder, so the static page lists every centre. */}
        <Suspense fallback={<LocationFinder />}>
          <LocationFinderFromUrl />
        </Suspense>
      </section>

      <section aria-labelledby="away" className="mx-auto max-w-7xl px-5">
        <h2 id="away" className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold text-navy">
          {t(away.title)}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {away.options.map((o) => {
            const { icon: Icon, tone } = awayLook[o.id as keyof typeof awayLook]
            return (
              <div key={o.id} className="flex flex-col items-start rounded-[2.25rem] bg-white p-8 shadow-soft">
                <span className={cn("grid size-14 place-items-center rounded-full", tone)}>
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{t(o.title)}</h3>
                <p className="mt-2 mb-6 text-lg leading-relaxed text-mauve">{t(o.text)}</p>
                <Button asChild size="lg" variant="outline" className="mt-auto h-11 rounded-full px-5">
                  <Link href={href(paths.book)}>
                    {t(o.action)}
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>
      </section>
      <div className="h-20 sm:h-28" />
    </>
  )
}
