import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionIntro } from "@/components/common/section-intro"
import { centresCopy } from "@/content/home"
import { cities } from "@/content/locations"
import { paths } from "@/content/site"
import { countInCity, coverage } from "@/features/locations/directory"
import { getI18n } from "@/i18n/server"

export async function CentresTeaser() {
  const { t, alt, altLocale, num, href } = await getI18n()
  const lead = t(centresCopy.summary)(num(coverage.centres), num(coverage.cities), num(coverage.provinces))

  return (
    <section aria-labelledby="centres" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid gap-12 rounded-[2.75rem] bg-blush p-7 sm:p-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div>
          <SectionIntro id="centres" copy={centresCopy} lead={lead} />
          <Button asChild size="xl" className="mt-8">
            <Link href={href(paths.locations)}>
              {t(centresCopy.cta)}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <ul className="flex flex-wrap content-center gap-3">
          {cities.map((c) => {
            const n = num(countInCity(c.id))
            return (
              <li key={c.id}>
                <Link
                  href={`${href(paths.locations)}?city=${c.id}`}
                  aria-label={t(centresCopy.cityLabel)(t(c), n)}
                  className="group flex items-center gap-3 rounded-full bg-white py-2.5 pr-3 pl-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose hover:text-white"
                >
                  <MapPin className="size-4 text-rose transition-colors group-hover:text-white" />
                  <span className="font-display text-xl font-semibold">{t(c)}</span>
                  <span lang={altLocale} className="text-mauve transition-colors group-hover:text-white/85">
                    {alt(c)}
                  </span>
                  <span className="grid size-7 place-items-center rounded-full bg-blush text-sm font-extrabold text-rose-deep tabular-nums transition-colors group-hover:bg-white">
                    {n}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
