import { Heart } from "lucide-react"
import { Sparkle } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { GuransBloom } from "@/features/thermal-lens/gurans-bloom"
import { AMBIENT_C, CORE_C } from "@/features/thermal-lens/heat"
import { pipeline, pipelineCopy } from "@/content/screening"
import { getI18n } from "@/i18n/server"

/** A still "camera view" of the thermal bloom. Illustrative, not a real scan. */
async function Viewfinder() {
  const { t, num } = await getI18n()
  return (
    <figure aria-hidden className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-[2.75rem] bg-heat-0 shadow-lift">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,#5a3aa8,transparent_75%)]" />
      <GuransBloom
        variant="thermal"
        className="absolute top-1/2 left-1/2 w-[112%] max-w-none -translate-x-1/2 translate-y-[-54%]"
      />
      <Sparkle className="absolute top-[22%] right-[14%] size-5 text-heat-4 motion-safe:animate-twinkle" />

      <div className="relative flex h-full flex-col justify-between p-5 text-sm font-bold text-white">
        <div className="flex justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
            {t(pipelineCopy.view)(num(3), num(5))}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-berry">
            <Heart className="size-3.5 fill-rose text-rose" />
            <span className="tabular-nums">{num(36.4, { minimumFractionDigits: 1 })}°C</span>
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-full bg-white/15 px-4 py-2.5 backdrop-blur-sm">
          <span className="tabular-nums">{num(AMBIENT_C)}°</span>
          <span className="h-2 flex-1 rounded-full bg-linear-to-r from-heat-1 via-heat-2 to-heat-4" />
          <span className="tabular-nums">{num(CORE_C)}°</span>
        </div>
      </div>
    </figure>
  )
}

export async function HowItReads() {
  const { t, alt, altLocale, num } = await getI18n()
  return (
    <section aria-labelledby="pipeline" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex justify-center lg:justify-start">
          <Viewfinder />
        </div>
        <div>
          <SectionIntro id="pipeline" copy={pipelineCopy} />
          <ol className="mt-10 space-y-4">
            {pipeline.map((step, i) => (
              <li key={step.title.en} className="flex gap-5 rounded-[1.75rem] bg-white p-6 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rose font-display text-lg font-semibold text-white">
                  {num(i + 1)}
                </span>
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-semibold">
                    {t(step.title)}
                    <span lang={altLocale} className="text-base font-semibold text-rose-deep">
                      {alt(step.title)}
                    </span>
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-mauve">{t(step.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
