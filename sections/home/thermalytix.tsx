import Link from "next/link"
import { ArrowRight, BrainCircuit, Feather, Info, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionIntro } from "@/components/common/section-intro"
import { thermalytixCopy, thermalytixFacts, thermalytixLimits } from "@/content/home"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const factLook = {
  ai: { icon: BrainCircuit, tile: "bg-lilac text-lilac-deep" },
  contact: { icon: Feather, tile: "bg-peach text-[#c4532a]" },
  radiation: { icon: ShieldCheck, tile: "bg-blush text-rose" },
}

/** What the technology is on the left, what its result cannot tell you on the right. */
export async function Thermalytix() {
  const { t, href } = await getI18n()

  return (
    <section aria-labelledby="thermalytix" className="mx-auto max-w-7xl px-5 pb-20 sm:pb-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionIntro id="thermalytix" copy={thermalytixCopy} />

          <ul className="mt-8 flex flex-wrap gap-3">
            {thermalytixFacts.map((f) => {
              const { icon: Icon, tile } = factLook[f.id]
              return (
                <li
                  key={f.id}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pr-4 pl-2 shadow-soft ring-1 ring-petal/50"
                >
                  <span className={cn("grid size-8 place-items-center rounded-full", tile)}>
                    <Icon className="size-4" strokeWidth={2.2} />
                  </span>
                  <span className="font-bold text-berry">{t(f.label)}</span>
                </li>
              )
            })}
          </ul>

          <Button asChild size="xl" variant="ghost" className="mt-8 text-berry max-sm:w-full">
            <Link href={href(paths.screening)}>
              {t(thermalytixCopy.more)}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="rounded-[2.25rem] bg-lilac p-8 shadow-soft sm:p-10">
          <h3 className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
            <span className="grid size-10 place-items-center rounded-full bg-white text-lilac-deep shadow-soft">
              <Info className="size-5" strokeWidth={2.2} />
            </span>
            {t(thermalytixCopy.keepInMind)}
          </h3>
          <ul className="mt-6 space-y-4">
            {thermalytixLimits.map((point) => (
              <li key={point.en} className="flex gap-4 text-lg leading-relaxed">
                <span aria-hidden className="mt-2.5 block size-2.5 shrink-0 rounded-full bg-rose ring-4 ring-blush" />
                {t(point)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
