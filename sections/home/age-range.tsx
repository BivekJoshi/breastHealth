import { SectionIntro } from "@/components/common/section-intro"
import { agesCopy } from "@/content/home"
import { ages } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const at = (age: number) => ((age - ages.min) / (ages.max - ages.min)) * 100

export async function AgeRange() {
  const { t, num } = await getI18n()
  return (
    <section aria-labelledby="ages" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center lg:gap-16">
        <SectionIntro id="ages" copy={agesCopy} />

        <figure className="rounded-[2.25rem] bg-white p-7 shadow-soft ring-1 ring-petal/60 sm:p-10">
          <div className="space-y-8">
            {ages.ranges.map((r) => (
              <div key={r.from}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className={cn("font-display text-xl font-semibold", !r.emphasis && "text-mauve")}>
                    {t(r.label)}
                  </span>
                  <span className="text-sm font-semibold text-mauve">{t(r.note)}</span>
                </div>
                <div className="relative mt-3 h-5 rounded-full bg-blush">
                  <div
                    className={cn(
                      "absolute inset-y-0 rounded-full",
                      r.emphasis ? "bg-linear-to-r from-[#f7a6c3] to-rose" : "bg-lavender"
                    )}
                    style={{ left: `${at(r.from)}%`, right: `${100 - at(r.to)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div aria-hidden className="relative mt-4 h-5 text-sm font-bold text-mauve tabular-nums">
            {ages.ticks.map((tick, i) => (
              <span key={tick} className={cn("absolute", i > 0 && "-translate-x-1/2")} style={{ left: `${at(tick)}%` }}>
                {num(tick)}
                {i === ages.ticks.length - 1 && "+"}
              </span>
            ))}
          </div>
          <figcaption className="mt-3 text-sm text-mauve">{t(agesCopy.caption)}</figcaption>
        </figure>
      </div>
    </section>
  )
}
