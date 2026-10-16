"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, Phone, RotateCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GuransMark } from "@/components/brand/gurans-mark"
import { paths } from "@/content/site"
import { finderCopy as copy } from "@/content/locations"
import { useI18n } from "@/i18n/client"
import type { I18n } from "@/i18n/i18n"
import { cn } from "@/lib/utils"
import { HOME_VISIT } from "@/features/booking/choices"
import type { Centre, Directory } from "./directory"
import { useLocations } from "./use-locations"

const legend = "text-sm font-extrabold text-berry"
const pill =
  "rounded-full px-4 py-2 text-sm font-bold transition-colors ring-1 ring-petal bg-white hover:bg-blush aria-pressed:bg-rose aria-pressed:text-white aria-pressed:ring-rose"

/** The finder, once the centre list has loaded. ?province= / ?city= values are checked against it. */
export function LocationFinder({
  initialProvince = null,
  initialCity = null,
}: {
  initialProvince?: string | null
  initialCity?: string | null
}) {
  const locations = useLocations()
  const { t, href } = useI18n()

  if (locations.status === "loading") return <FinderSkeleton label={t(copy.loading)} />

  if (locations.status === "error") {
    return (
      <FinderNotice title={t(copy.failed)} hint={t(copy.failedHint)}>
        <Button variant="outline" size="lg" className="h-11 rounded-full px-5" onClick={locations.retry}>
          <RotateCw data-icon="inline-start" />
          {t(copy.retry)}
        </Button>
      </FinderNotice>
    )
  }

  const { directory } = locations

  if (directory.centres.length === 0) {
    return (
      <FinderNotice title={t(copy.empty)} hint={t(copy.emptyHint)}>
        <Button asChild size="lg" className="h-11 rounded-full px-5">
          <Link href={`${href(paths.book)}?centre=${HOME_VISIT}`}>
            {t(copy.bookHome)}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </FinderNotice>
    )
  }

  const city = directory.isCityId(initialCity) ? initialCity : null
  const province = city
    ? directory.getCity(city).province
    : directory.isProvinceId(initialProvince)
      ? initialProvince
      : null

  return <Finder directory={directory} initialProvince={province} initialCity={city} />
}

function Finder({
  directory,
  initialProvince,
  initialCity,
}: {
  directory: Directory
  initialProvince: string | null
  initialCity: string | null
}) {
  const i18n = useI18n()
  const { t, alt, altLocale, num } = i18n
  const { provinces, citiesIn, countIn, filterCentres, getProvince, groupByCity } = directory

  const [province, setProvince] = useState(initialProvince)
  const [city, setCity] = useState(initialCity)
  const [query, setQuery] = useState("")

  const groups = useMemo(
    () => groupByCity(filterCentres({ province, city, query })),
    [groupByCity, filterCentres, province, city, query]
  )
  const total = groups.reduce((n, g) => n + g.centres.length, 0)
  const cityOptions = province ? citiesIn(province) : []

  const pickProvince = (id: string | null) => {
    setProvince(id)
    setCity(null)
  }
  const reset = () => {
    pickProvince(null)
    setQuery("")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
      <aside className="space-y-7 rounded-[2.25rem] bg-white p-6 shadow-soft lg:sticky lg:top-32 lg:self-start">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mauve" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(copy.search)}
            aria-label={t(copy.searchLabel)}
            className="h-12 rounded-full border-petal bg-paper pl-11 text-base"
          />
        </div>

        <fieldset>
          <legend className={legend}>
            {t(copy.province)} <span className="font-semibold text-mauve">· {t(copy.eastToWest)}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" aria-pressed={!province} onClick={() => pickProvince(null)} className={pill}>
              {t(copy.all)}
            </button>
            {provinces.map((p) => {
              const count = countIn(p.id)
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={province === p.id}
                  disabled={count === 0}
                  onClick={() => pickProvince(p.id)}
                  className={cn(pill, "disabled:cursor-not-allowed disabled:bg-paper disabled:text-mauve/60 disabled:ring-border")}
                  title={count === 0 ? t(copy.none)(t(p)) : undefined}
                >
                  {t(p)}
                  <span className="ml-1.5 tabular-nums opacity-70">{count ? num(count) : "–"}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {cityOptions.length > 1 && (
          <fieldset>
            <legend className={legend}>{t(copy.city)}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" aria-pressed={city === null} onClick={() => setCity(null)} className={pill}>
                {t(copy.all)}
              </button>
              {cityOptions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={city === c.id}
                  onClick={() => setCity(c.id)}
                  className={pill}
                >
                  {t(c)}
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </aside>

      <div>
        <p aria-live="polite" className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-mauve shadow-sm">
          {t(copy.count)(num(total), num(groups.length))}
        </p>

        {groups.length === 0 ? (
          <FinderNotice title={t(copy.noMatch)(query)} hint={t(copy.noMatchHint)} className="mt-6">
            <Button variant="outline" size="lg" className="h-11 rounded-full px-5" onClick={reset}>
              {t(copy.showAll)}
            </Button>
          </FinderNotice>
        ) : (
          <div className="mt-6 space-y-10">
            {groups.map(({ city: c, centres }) => (
              <section key={c.id} aria-labelledby={`city-${c.id}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <GuransMark className="size-7" />
                  <h2 id={`city-${c.id}`} className="font-display text-3xl font-semibold text-navy">
                    {t(c)}
                  </h2>
                  {alt(c) !== t(c) && (
                    <span lang={altLocale} className="text-lg font-semibold text-rose-deep">
                      {alt(c)}
                    </span>
                  )}
                  <span className="ml-auto rounded-full bg-lilac px-3 py-1 text-sm font-bold text-lilac-deep">
                    {t(copy.provinceName)(t(getProvince(c.province)))}
                  </span>
                </div>
                <ul className="mt-4 grid gap-4 xl:grid-cols-2">
                  {centres.map((centre) => (
                    <CentreCard key={centre.id} centre={centre} directory={directory} i18n={i18n} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CentreCard({
  centre,
  directory,
  i18n: { t, href },
}: {
  centre: Centre
  directory: Directory
  i18n: I18n
}) {
  const name = t(centre.name)
  return (
    <li className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-6 shadow-soft">
      <div>
        <span className="rounded-full bg-blush px-3 py-1 text-xs font-extrabold text-rose-deep">
          {t(directory.getType(centre.type))}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold">{name}</h3>
        <p className="mt-1 flex items-start gap-1.5 text-mauve">
          <MapPin className="mt-1 size-4 shrink-0" />
          {t(centre.address)}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-4">
          <a href={`tel:${centre.phone}`} aria-label={t(copy.call)(name)}>
            <Phone data-icon="inline-start" />
            <span className="tabular-nums">{centre.phone}</span>
          </a>
        </Button>
        <Button asChild size="lg" className="h-11 rounded-full px-5">
          <Link href={`${href(paths.book)}?centre=${centre.id}`} aria-label={t(copy.bookAt)(name)}>
            {t(copy.book)}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </li>
  )
}

/** A centred card for the empty, failed and no-match states. */
function FinderNotice({
  title,
  hint,
  className,
  children,
}: {
  title: string
  hint: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-[2.25rem] bg-white p-10 text-center shadow-soft", className)}>
      <p className="font-display text-2xl font-semibold">{title}</p>
      <p className="mt-2 text-mauve">{hint}</p>
      <div className="mt-6 flex justify-center">{children}</div>
    </div>
  )
}

/** Holds the finder's shape while the list loads, so the page does not jump. */
function FinderSkeleton({ label }: { label: string }) {
  const block = "animate-pulse rounded-full bg-blush"
  return (
    <div role="status" className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
      <span className="sr-only">{label}</span>
      <div aria-hidden className="space-y-7 rounded-[2.25rem] bg-white p-6 shadow-soft">
        <div className={cn(block, "h-12")} />
        <div className="flex flex-wrap gap-2">
          {[16, 20, 18, 22, 20, 18, 24, 26].map((w, i) => (
            <div key={i} className={cn(block, "h-9")} style={{ width: `${w * 0.25}rem` }} />
          ))}
        </div>
      </div>
      <div aria-hidden>
        <div className={cn(block, "h-8 w-48 bg-white shadow-sm")} />
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-[1.75rem] bg-white shadow-soft" />
          ))}
        </div>
      </div>
    </div>
  )
}
