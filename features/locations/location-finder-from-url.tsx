"use client"

import { useSearchParams } from "next/navigation"
import { isCityId, isProvinceId } from "./directory"
import { LocationFinder } from "./location-finder"

/** Reads ?province= / ?city= so other pages can deep-link into the finder. */
export function LocationFinderFromUrl() {
  const params = useSearchParams()
  const city = params.get("city")
  const province = params.get("province")
  const initialCity = isCityId(city) ? city : null
  const initialProvince = isProvinceId(province) ? province : null

  return (
    <LocationFinder
      key={`${initialProvince}:${initialCity}`}
      initialCity={initialCity}
      initialProvince={initialProvince}
    />
  )
}
