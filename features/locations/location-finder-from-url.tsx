"use client"

import { useSearchParams } from "next/navigation"
import { LocationFinder } from "./location-finder"

/** Reads ?province= / ?city= so other pages can deep-link into the finder. */
export function LocationFinderFromUrl() {
  const params = useSearchParams()
  const city = params.get("city")
  const province = params.get("province")

  // Raw values: the finder checks them against the centre list once it has loaded.
  return <LocationFinder key={`${province}:${city}`} initialCity={city} initialProvince={province} />
}
