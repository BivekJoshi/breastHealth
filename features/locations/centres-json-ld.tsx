"use client"

import { JsonLd } from "@/components/common/json-ld"
import { useI18n } from "@/i18n/client"
import { useLocations } from "./use-locations"

/**
 * Every centre as a MedicalClinic, so Google can show it for searches near that city.
 * The list comes from the API after the page loads; Google reads structured data
 * from the rendered page, so adding it in the browser is enough.
 */
export function CentresJsonLd() {
  const { t } = useI18n()
  const locations = useLocations()
  if (locations.status !== "ready" || !locations.directory.centres.length) return null
  const { centres, getCity, getProvince } = locations.directory

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: centres.map((centre, i) => {
          const city = getCity(centre.city)
          return {
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "MedicalClinic",
              name: t(centre.name),
              telephone: centre.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: t(centre.address),
                addressLocality: t(city),
                addressRegion: t(getProvince(city.province)),
                addressCountry: "NP",
              },
            },
          }
        }),
      }}
    />
  )
}
