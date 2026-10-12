import { Petal, Sparkle } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { agesCopy } from "@/content/home"
import { ages } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const at = (age: number) => ((age - ages.min) / (ages.max - ages.min)) * 100

// Where mammography usually starts; the years before it are the gap thermal screening fills.
const gapEnd = Math.max(...ages.ranges.map((r) => r.from))
const starts = new Set(ages.ranges.map((r) => r.from))

export async function AgeRange() {
  const { t, num } = await getI18n()
  return (
    <section aria-labelledby="ages" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center lg:gap-16">
        <SectionIntro id="ages" copy={agesCopy} />

        <figure className="relative rounded-[2.25rem] bg-white p-7 shadow-soft ring-1 ring-petal/60 sm:p-10">
          <Petal className="absolute -top-5 right-10 size-10 rotate-24 text-petal" />
          <Sparkle className="absolute -top-2 right-24 size-4 text-rose/40" />

          <div className="relative pt-12">
            {/* the years before mammography usually starts */}
            <div
              aria-hidden
              className="absolute -inset-y-3 -left-3 rounded-[1.25rem] bg-blush/70"
              style={{ width: `calc(${at(gapEnd)}% + 0.75rem)` }}
            >
              <span className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-extrabold whitespace-nowrap text-rose-deep shadow-sm ring-1 ring-petal">
                {t(agesCopy.gap)}
              </span>
            </div>

            <div className="relative space-y-8">
              {ages.ranges.map((r) => (
                <div key={r.from}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span
                      className={cn(
                        "flex items-center gap-2.5 font-display text-xl font-semibold",
                        !r.emphasis && "text-mauve"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "size-2.5 rounded-full",
                          r.emphasis ? "bg-linear-to-r from-[#f7a6c3] to-rose" : "bg-lavender"
                        )}
                      />
                      {t(r.label)}
                    </span>
                    <span className="text-sm font-semibold text-mauve">{t(r.note)}</span>
                  </div>
                  <div className="relative mt-3 h-7">
                    {/* the years this test usually isn't offered */}
                    {r.from > ages.min && (
                      <div
                        aria-hidden
                        className="absolute inset-y-0 left-0 rounded-full border-2 border-dashed border-lavender/80"
                        style={{ right: `calc(${100 - at(r.from)}% + 0.375rem)` }}
                      />
                    )}
                    <div
                      className={cn(
                        "absolute inset-y-0 flex items-center rounded-full px-2",
                        r.emphasis ? "bg-linear-to-r from-[#f7a6c3] to-rose shadow-soft" : "bg-lavender"
                      )}
                      style={{ left: `${at(r.from)}%`, right: `${100 - at(r.to)}%` }}
                    >
                      <span aria-hidden className="size-3 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div aria-hidden className="relative mt-8 h-9 border-t border-petal tabular-nums">
            {ages.ticks.map((tick, i) => {
              const key = starts.has(tick)
              const last = i === ages.ticks.length - 1
              return (
                <span key={tick} className="absolute top-0" style={{ left: `${at(tick)}%` }}>
                  <span
                    className={cn(
                      "absolute top-0 block -translate-1/2 rounded-full",
                      key ? "size-2.5 bg-rose ring-4 ring-blush" : "size-1.5 bg-petal"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-3 text-sm",
                      i > 0 && "-translate-x-1/2",
                      key ? "font-extrabold text-rose-deep" : "font-bold text-mauve"
                    )}
                  >
                    {num(tick)}
                    {last && "+"}
                  </span>
                </span>
              )
            })}
          </div>
          <figcaption className="mt-2 text-sm text-mauve">{t(agesCopy.caption)}</figcaption>
        </figure>
      </div>
    </section>
  )
}
