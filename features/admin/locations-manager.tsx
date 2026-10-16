"use client"

import { useCallback, useEffect, useState } from "react"
import { Building2, MapPin, Phone, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { AdminCentre, AdminCity, AdminLocations, AdminRequest } from "./admin-api"
import { CentreEditor, CityEditor } from "./editors"
import { EmptyRow, LoadState, NoticeBanner, RowActions, badge, card, useRowActions } from "./list-ui"

type Editing =
  | { kind: "city"; city: AdminCity | null }
  | { kind: "centre"; centre: AdminCentre | null; cityId?: number }

export function LocationsManager({ request }: { request: AdminRequest }) {
  const [data, setData] = useState<AdminLocations | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Editing | null>(null)

  const reload = useCallback(
    () =>
      request<AdminLocations>("/admin/locations").then(
        (next) => {
          setData(next)
          setLoadError(null)
        },
        (error: Error) => setLoadError(error.message)
      ),
    [request]
  )

  useEffect(() => {
    reload()
  }, [reload])

  const { notice, setNotice, busyId, act } = useRowActions(reload)

  const saved = (text: string) => {
    setEditing(null)
    setNotice({ tone: "success", text })
    reload()
  }

  const toggleCity = (city: AdminCity) =>
    act(
      `city-${city.id}`,
      () => request(`/admin/cities/${city.id}`, { method: "PATCH", body: { isActive: !city.is_active } }),
      `${city.name_en} is now ${city.is_active ? "hidden" : "visible"}.`
    )

  const deleteCity = (city: AdminCity) => {
    if (!window.confirm(`Delete ${city.name_en}? This cannot be undone.`)) return
    act(`city-${city.id}`, () => request(`/admin/cities/${city.id}`, { method: "DELETE" }), `Deleted ${city.name_en}.`)
  }

  const toggleCentre = (centre: AdminCentre) =>
    act(
      `centre-${centre.id}`,
      () => request(`/admin/centres/${centre.id}`, { method: "PATCH", body: { isActive: !centre.is_active } }),
      `${centre.name_en} is now ${centre.is_active ? "hidden" : "visible"}.`
    )

  const deleteCentre = (centre: AdminCentre) => {
    if (!window.confirm(`Delete ${centre.name_en}? This cannot be undone.`)) return
    act(
      `centre-${centre.id}`,
      () => request(`/admin/centres/${centre.id}`, { method: "DELETE" }),
      `Deleted ${centre.name_en}.`
    )
  }

  if (!data) return <LoadState error={loadError} what="locations" onRetry={reload} />

  const provinceName = (id: string) => data.provinces.find((p) => p.id === id)?.en ?? id
  const typeName = (id: string) => data.types.find((t) => t.id === id)?.en ?? id
  const liveCentres = data.centres.filter(
    (c) => c.is_active && data.cities.find((city) => city.id === c.city_id)?.is_active
  ).length

  return (
    <div className="space-y-8">
      <p className="text-lg text-mauve">
        <strong className="text-berry">{liveCentres}</strong> of {data.centres.length}{" "}
        {data.centres.length === 1 ? "centre" : "centres"} live on the website, in {data.cities.length}{" "}
        {data.cities.length === 1 ? "city" : "cities"}.
      </p>

      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />

      {/* ------------------------------ cities ------------------------------ */}
      <section aria-labelledby="cities" className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="cities" className="font-display text-2xl font-semibold text-navy">
              Cities
            </h2>
            <p className="text-mauve">Every centre belongs to a city. A city only appears on the website once it has a visible centre.</p>
          </div>
          <Button size="lg" className="h-11 rounded-full px-5" onClick={() => setEditing({ kind: "city", city: null })}>
            <Plus data-icon="inline-start" />
            Add city
          </Button>
        </div>

        {data.cities.length === 0 ? (
          <EmptyRow icon={MapPin} text="No cities yet. Add the first city, then add its centres." />
        ) : (
          <ul className="mt-6 divide-y divide-border">
            {data.cities.map((city) => (
              <li key={city.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-berry">
                    {city.name_en}
                    {city.name_ne && (
                      <span lang="ne" className="ml-2 font-semibold text-rose-deep">
                        {city.name_ne}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-mauve">
                    {provinceName(city.province)} Province · {city.centre_count}{" "}
                    {city.centre_count === 1 ? "centre" : "centres"} · /{city.slug}
                  </p>
                </div>
                <RowActions
                  active={city.is_active}
                  busy={busyId === `city-${city.id}`}
                  name={city.name_en}
                  onToggle={() => toggleCity(city)}
                  onEdit={() => setEditing({ kind: "city", city })}
                  onDelete={() => deleteCity(city)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ------------------------------ centres ----------------------------- */}
      <section aria-labelledby="centres" className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="centres" className="font-display text-2xl font-semibold text-navy">
              Centres
            </h2>
            <p className="text-mauve">What the locations page, the home page and the booking form list.</p>
          </div>
          <Button
            size="lg"
            className="h-11 rounded-full px-5"
            disabled={data.cities.length === 0}
            title={data.cities.length === 0 ? "Add a city first" : undefined}
            onClick={() => setEditing({ kind: "centre", centre: null })}
          >
            <Plus data-icon="inline-start" />
            Add centre
          </Button>
        </div>

        {data.cities.length === 0 ? (
          <EmptyRow icon={Building2} text="Add a city first — centres are listed under their city." />
        ) : (
          <div className="mt-6 space-y-8">
            {data.cities.map((city) => {
              const centres = data.centres.filter((c) => c.city_id === city.id)
              return (
                <div key={city.id}>
                  <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
                    <h3 className="font-display text-xl font-semibold text-navy">{city.name_en}</h3>
                    {!city.is_active && <span className={cn(badge, "bg-paper text-mauve ring-1 ring-border")}>City hidden</span>}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto rounded-full text-rose-deep"
                      onClick={() => setEditing({ kind: "centre", centre: null, cityId: city.id })}
                    >
                      <Plus data-icon="inline-start" />
                      Add in {city.name_en}
                    </Button>
                  </div>
                  {centres.length === 0 ? (
                    <p className="py-3.5 text-sm text-mauve">No centres in {city.name_en} yet.</p>
                  ) : (
                    <ul className="divide-y divide-border">
                      {centres.map((centre) => (
                        <li key={centre.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2 font-bold text-berry">
                              {centre.name_en}
                              <span className={cn(badge, "bg-blush text-rose-deep")}>{typeName(centre.type)}</span>
                            </p>
                            <p className="mt-0.5 flex flex-wrap gap-x-4 text-sm text-mauve">
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" />
                                {centre.address_en}
                              </span>
                              <span className="inline-flex items-center gap-1 tabular-nums">
                                <Phone className="size-3.5" />
                                {centre.phone}
                              </span>
                            </p>
                          </div>
                          <RowActions
                            active={centre.is_active}
                            busy={busyId === `centre-${centre.id}`}
                            name={centre.name_en}
                            onToggle={() => toggleCentre(centre)}
                            onEdit={() => setEditing({ kind: "centre", centre })}
                            onDelete={() => deleteCentre(centre)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Sheet open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent className="w-full! overflow-y-auto bg-white sm:max-w-md!">
          {editing?.kind === "city" && (
            <CityEditor
              key={editing.city?.id ?? "new"}
              city={editing.city}
              provinces={data.provinces}
              request={request}
              onSaved={saved}
            />
          )}
          {editing?.kind === "centre" && (
            <CentreEditor
              key={editing.centre?.id ?? `new-${editing.cityId ?? ""}`}
              centre={editing.centre}
              defaultCityId={editing.cityId}
              data={data}
              request={request}
              onSaved={saved}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
