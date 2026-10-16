import type { Bilingual } from "@/content/types"

/* The shapes GET /api/locations returns. Ids are the slugs the URLs use. */

/** One of Nepal's seven provinces; the API lists them east → west. */
export type Province = Bilingual & { id: string }
export type CentreType = Bilingual & { id: string }
/** A city with at least one visible centre. */
export type City = Bilingual & { id: string; province: string }

export type Centre = {
  id: string
  city: string
  name: Bilingual
  address: Bilingual
  phone: string
  type: string
}

export type LocationsData = {
  provinces: Province[]
  types: CentreType[]
  cities: City[]
  centres: Centre[]
}

export type Filters = {
  province: string | null
  city: string | null
  query: string
}

/** Lookups and filters over one API response. */
export function createDirectory({ provinces, types, cities, centres }: LocationsData) {
  const cityMap = new Map(cities.map((c) => [c.id, c]))
  const provinceMap = new Map(provinces.map((p) => [p.id, p]))
  const typeMap = new Map(types.map((t) => [t.id, t]))
  const centreIds = new Set(centres.map((c) => c.id))

  const getCity = (id: string) => cityMap.get(id)!
  const getProvince = (id: string) => provinceMap.get(id)!
  const getType = (id: string): Bilingual => typeMap.get(id) ?? { en: id, ne: id }

  const countIn = (province: string) =>
    centres.filter((c) => getCity(c.city).province === province).length

  const countInCity = (city: string) => centres.filter((c) => c.city === city).length

  function filterCentres({ province, city, query }: Filters): Centre[] {
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
  function groupByCity(list: Centre[]) {
    return cities
      .map((city) => ({ city, centres: list.filter((c) => c.city === city.id) }))
      .filter((g) => g.centres.length > 0)
  }

  return {
    provinces,
    cities,
    centres,
    getCity,
    getProvince,
    getType,
    isCityId: (v: string | null): v is string => !!v && cityMap.has(v),
    isProvinceId: (v: string | null): v is string => !!v && provinceMap.has(v),
    isCentreId: (v: string | null): v is string => !!v && centreIds.has(v),
    citiesIn: (province: string) => cities.filter((c) => c.province === province),
    countIn,
    countInCity,
    coverage: {
      centres: centres.length,
      cities: new Set(centres.map((c) => c.city)).size,
      provinces: new Set(centres.map((c) => getCity(c.city).province)).size,
    },
    filterCentres,
    groupByCity,
  }
}

export type Directory = ReturnType<typeof createDirectory>
