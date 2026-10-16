"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { centresCopy } from "@/content/home"
import { paths } from "@/content/site"
import { useLocations } from "@/features/locations/use-locations"
import { useI18n } from "@/i18n/client"

const lead = "mt-4 text-lg leading-relaxed text-pretty text-mauve"

/** "13 centres in 9 cities across 6 provinces…", from the live list. */
export function CoverageLead() {
  const { t, num } = useI18n()
  const locations = useLocations()

  if (locations.status === "loading") {
    return (
      <div aria-hidden className="mt-4 space-y-2.5">
        <div className="h-5 animate-pulse rounded-full bg-white/70" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/70" />
      </div>
    )
  }

  const coverage = locations.status === "ready" ? locations.directory.coverage : null
  if (!coverage?.centres) return <p className={lead}>{t(centresCopy.pending)}</p>

  return (
    <p className={lead}>
      {t(centresCopy.summary)(num(coverage.centres), num(coverage.cities), num(coverage.provinces))}
    </p>
  )
}

/** One pill per city, linking into the finder already filtered to it. */
export function CityLinks() {
  const { t, alt, altLocale, num, href } = useI18n()
  const locations = useLocations()

  if (locations.status === "loading") {
    return (
      <ul aria-hidden className="flex flex-wrap content-center gap-3">
        {[9, 11, 8, 12, 10, 9, 11].map((w, i) => (
          <li key={i} className="h-12 animate-pulse rounded-full bg-white/70" style={{ width: `${w}rem` }} />
        ))}
      </ul>
    )
  }

  // Failed or empty: the lead already says so, and the button still leads to the finder.
  if (locations.status === "error") return null
  const { cities, countInCity } = locations.directory

  return (
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
              {alt(c) !== t(c) && (
                <span lang={altLocale} className="text-mauve transition-colors group-hover:text-white/85">
                  {alt(c)}
                </span>
              )}
              <span className="grid size-7 place-items-center rounded-full bg-blush text-sm font-extrabold text-rose-deep tabular-nums transition-colors group-hover:bg-white">
                {n}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
