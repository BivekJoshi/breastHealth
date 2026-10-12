import Link from "next/link"
import { ArrowRight, CalendarCheck, CalendarDays, Clock, ShieldCheck, Sparkles, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Script } from "@/components/brand/doodles"
import { ScanPortrait } from "@/features/thermal-lens/scan-portrait"
import { common } from "@/content/common"
import { hero } from "@/content/home"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

const featureIcons = { safe: ShieldCheck, visit: Clock, ages: UserRound, report: CalendarCheck }

/** The home hero: the promise on the left, a woman with a thermal scan on the right. */
export async function Hero() {
  const { t, href } = await getI18n()
  const title = t(hero.title)

  return (
    <section
      aria-labelledby="hero"
      // a soft pink halo behind the photo
      className="overflow-x-clip bg-[radial-gradient(38%_55%_at_80%_48%,#ffe4ee,transparent_72%)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pt-12 pb-16 sm:px-10 lg:min-h-[min(calc(100svh-6rem),820px)] lg:grid-cols-[minmax(0,1fr)_min(28rem,calc((100svh-12rem)*0.87))] lg:gap-12 lg:py-12 xl:grid-cols-[minmax(0,1fr)_min(30rem,calc((100svh-12rem)*0.87))]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-[0.7rem] font-extrabold tracking-[0.08em] text-rose-deep uppercase sm:text-xs sm:tracking-[0.12em] [&:lang(ne)]:tracking-normal">
            <Sparkles className="size-3.5 text-rose" />
            {t(hero.badge)}
          </span>

          <h1
            id="hero"
            className="mt-7 font-display text-[clamp(2.5rem,4.3vw,4.1rem)] leading-[1.06] font-semibold text-berry"
          >
            <span className="block">{title.first}</span>
            {title.soft && <span className="text-mauve">{title.soft}</span>}
            <Script className="text-[1.15em] leading-[0.8]">{title.accent}</Script>
            {title.after}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-mauve">{t(hero.lead)}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="xl" className="max-sm:w-full">
              <Link href={href(paths.book)}>
                <CalendarDays data-icon="inline-start" />
                {t(common.book)}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="ghost" className="text-berry max-sm:w-full">
              <Link href={href(paths.locations)}>
                {t(hero.findCentre)}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <ul className="mt-12 grid max-w-xl grid-cols-2 gap-y-7 sm:grid-cols-4 sm:divide-x sm:divide-petal">
            {hero.features.map((f) => {
              const Icon = featureIcons[f.id as keyof typeof featureIcons]
              return (
                <li key={f.id} className="flex flex-col items-start gap-3 pr-4 sm:px-5 sm:first:pl-0">
                  <span className="grid size-11 place-items-center rounded-full bg-blush text-rose">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm leading-snug font-semibold text-berry/80">{t(f.label)}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <ScanPortrait className="mx-auto w-full max-w-[26rem] lg:max-w-none" />
      </div>
    </section>
  )
}
