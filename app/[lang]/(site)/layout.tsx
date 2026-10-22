import { JsonLd } from "@/components/common/json-ld"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { site } from "@/content/site"
import { locales } from "@/i18n/config"
import { getI18n } from "@/i18n/server"

export default async function SiteLayout({ children }: LayoutProps<"/[lang]">) {
  const { t } = await getI18n()
  return (
    <>
      {/* Who runs the site, for Google's knowledge panel and search results. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalOrganization",
              "@id": `${site.url}/#organization`,
              name: site.name,
              alternateName: [site.nameNe, "BreastScan Nepal", "BreastScan.health"],
              url: site.url,
              logo: `${site.url}/apple-icon.png`,
              description: t(site.description),
              telephone: site.phone,
              email: site.email,
              address: { "@type": "PostalAddress", streetAddress: t(site.address), addressCountry: "NP" },
              areaServed: { "@type": "Country", name: "Nepal" },
              knowsAbout: ["Breast cancer screening", "Breast health", "Thermal imaging", "Niramai Thermalytix"],
            },
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              inLanguage: locales,
              publisher: { "@id": `${site.url}/#organization` },
            },
          ],
        }}
      />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
