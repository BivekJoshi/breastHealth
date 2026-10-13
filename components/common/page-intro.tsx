import { AccentTitle, Floaters } from "@/components/brand/doodles"
import { PinkRibbon } from "@/components/brand/pink-ribbon"
import { AltTag } from "@/components/common/section-intro"
import type { SectionCopy } from "@/content/types"
import { plainTitle } from "@/i18n/i18n"
import { getI18n } from "@/i18n/server"

/** Soft gradient banner at the top of inner pages. */
export async function PageIntro({ copy }: { copy: SectionCopy }) {
  const { t, alt, altLocale } = await getI18n()
  return (
    <header className="px-3 pt-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-blush bg-[radial-gradient(60%_80%_at_10%_0%,#ffd9e8,transparent_70%),radial-gradient(50%_70%_at_95%_30%,#e9e0ff,transparent_70%),radial-gradient(45%_60%_at_60%_110%,#ffe3d6,transparent_70%)]">
        <Floaters
          items={[
            { kind: "petal", className: "top-10 right-[12%] size-9 text-rose/25", tilt: 20 },
            { kind: "petal", className: "right-[28%] bottom-8 size-6 text-lilac-deep/20", tilt: -30, delay: 1.5 },
            { kind: "sparkle", className: "top-16 right-[34%] size-5 text-heat-3", delay: 0.6 },
            { kind: "sparkle", className: "right-[8%] bottom-14 size-4 text-rose/50", delay: 1.8 },
          ]}
        />
        {/* the awareness ribbon, in the space beside the heading */}
        <PinkRibbon className="absolute top-1/2 right-[16%] hidden h-[62%] max-h-56 -translate-y-1/2 lg:block" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <AltTag lang={altLocale}>{plainTitle(alt(copy.title))}</AltTag>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.02] font-semibold text-balance text-berry">
            <AccentTitle title={t(copy.title)} />
          </h1>
          {copy.lead && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-mauve sm:text-xl">
              {t(copy.lead)}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
