import {
  centres,
  cities,
  provinces,
  type Centre,
  type City,
  type CityId,
  type ProvinceId,
} from "@/content/locations"

export type Filters = {
  province: ProvinceId | null
  city: CityId | null
  query: string
}

const cityMap = new Map<string, City>(cities.map((c) => [c.id, c]))

export const getCity = (id: CityId) => cityMap.get(id)!
export const getProvince = (id: ProvinceId) => provinces.find((p) => p.id === id)!

export const isCityId = (v: string | null): v is CityId => !!v && cityMap.has(v)
export const isProvinceId = (v: string | null): v is ProvinceId =>
  !!v && provinces.some((p) => p.id === v)

export const citiesIn = (province: ProvinceId) => cities.filter((c) => c.province === province)

export const countIn = (province: ProvinceId) =>
  centres.filter((c) => getCity(c.city).province === province).length

export const countInCity = (city: CityId) => centres.filter((c) => c.city === city).length

export const coverage = {
  centres: centres.length,
  cities: new Set(centres.map((c) => c.city)).size,
  provinces: new Set(centres.map((c) => getCity(c.city).province)).size,
}

export function filterCentres({ province, city, query }: Filters): Centre[] {
  const q = query.trim().toLowerCase()
  return centres.filter((centre) => {
    const c = getCity(centre.city)
    if (province && c.province !== province) return false
    if (city && centre.city !== city) return false
    if (!q) return true
    const p = getProvince(c.province)
    // match either language, whichever one the visitor types in
    return [centre.name.en, centre.name.ne, centre.address.en, centre.address.ne, c.en, c.ne, p.en, p.ne].some(
      (s) => s.toLowerCase().includes(q)
    )
  })
}

/** Groups centres by city, keeping the east → west city order. */
export function groupByCity(list: Centre[]) {
  return cities
    .map((city) => ({ city, centres: list.filter((c) => c.city === city.id) }))
    .filter((g) => g.centres.length > 0)
}
