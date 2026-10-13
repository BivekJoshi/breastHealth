import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccentTitle, Floaters } from "@/components/brand/doodles"
import { common } from "@/content/common"
import { paths, site } from "@/content/site"
import { getI18n } from "@/i18n/server"

export async function BookCta() {
  const { t, alt, altLocale, href } = await getI18n()
  return (
    <section aria-labelledby="book-cta" className="px-3 py-16 sm:px-4 sm:py-24">
      <div className="on-rose relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] bg-linear-to-br from-rose via-[#e0508a] to-[#b85fd0] px-6 py-16 text-center text-white shadow-lift sm:px-12 sm:py-20">
        <Floaters
          items={[
            { kind: "petal", className: "top-8 left-[8%] size-10 text-white/25", tilt: -20 },
            { kind: "petal", className: "right-[10%] bottom-10 size-12 text-white/20", tilt: 35, delay: 2 },
            { kind: "sparkle", className: "top-12 right-[18%] size-6 text-heat-4", delay: 0.4 },
            { kind: "sparkle", className: "bottom-16 left-[16%] size-4 text-white/70", delay: 1.4 },
            { kind: "ribbon", className: "top-10 right-[7%] h-16 w-12 text-white/25", tilt: 16, delay: 0.8 },
            { kind: "ribbon", className: "bottom-8 left-[5%] hidden h-12 w-9 text-white/20 sm:block", tilt: -18, delay: 2.6 },
          ]}
        />
        <p lang={altLocale} className="text-xl font-semibold text-white/90">
          {alt(common.cta.line)}
        </p>
        <h2
          id="book-cta"
          className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-semibold text-balance"
        >
          <AccentTitle title={t(common.cta.title)} accentClassName="text-white" />
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="xl" variant="inverse">
            <Link href={href(paths.book)}>
              {t(common.book)}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline-inverse">
            <a href={`tel:${site.phone}`}>
              <Phone data-icon="inline-start" />
              {site.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
