import Link from "next/link"
import { ArrowRight, CalendarHeart, HandHeart, MessageCircleHeart } from "lucide-react"
import { Floaters } from "@/components/brand/doodles"
import { PinkRibbon } from "@/components/brand/pink-ribbon"
import { SectionIntro } from "@/components/common/section-intro"
import { pinkOctober, pinkOctoberCopy, pinkOctoberSteps } from "@/content/pink-october"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

const stepLook = {
  book: { icon: CalendarHeart, path: paths.book },
  check: { icon: HandHeart, path: paths.know },
  remind: { icon: MessageCircleHeart, path: paths.locations },
}

/** Breast Cancer Awareness Month: the ribbon, and three things to do this October. */
export async function PinkOctober() {
  const { t, href } = await getI18n()

  return (
    <section aria-labelledby="pink-october" className="px-3 pt-4 pb-16 sm:px-4 sm:pb-20">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-blush bg-[radial-gradient(45%_70%_at_12%_40%,#ffd3e2,transparent_70%),radial-gradient(40%_60%_at_100%_0%,#f3edff,transparent_70%)] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
        <Floaters
          items={[
            { kind: "ribbon", className: "top-8 right-[7%] h-12 w-9 text-rose/20", tilt: 14 },
            { kind: "sparkle", className: "top-14 right-[16%] size-5 text-rose/40", delay: 0.8 },
            { kind: "petal", className: "right-[4%] bottom-10 hidden size-9 text-petal sm:block", tilt: -26, delay: 1.6 },
          ]}
        />

        <div className="grid items-center gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div className="relative mx-auto w-36 sm:w-44 lg:w-full lg:px-4">
            <span aria-hidden className="absolute inset-[-12%] rounded-full bg-white/70 blur-2xl" />
            <PinkRibbon className="relative w-full drop-shadow-[0_18px_22px_rgb(207_47_106/0.3)]" />
            <span className="absolute top-[8%] -right-8 rotate-6 rounded-2xl bg-white px-3.5 py-1.5 font-display text-lg font-semibold text-rose-deep shadow-soft ring-1 ring-petal/60 sm:-right-12 lg:-right-6">
              {t(pinkOctober.month)}
            </span>
          </div>

          <div>
            <SectionIntro id="pink-october" copy={pinkOctoberCopy} className="max-w-3xl" />

            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {pinkOctoberSteps.map((step) => {
                const { icon: Icon, path } = stepLook[step.id]
                return (
                  <li key={step.id}>
                    <Link
                      href={href(path)}
                      className="group flex h-full flex-col rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-petal/50 transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift"
                    >
                      <span className="grid size-11 place-items-center rounded-2xl bg-blush text-rose transition-transform duration-300 ease-soft group-hover:rotate-[-8deg]">
                        <Icon className="size-5" strokeWidth={2.2} />
                      </span>
                      <span className="mt-4 font-display text-xl leading-snug font-semibold text-berry">
                        {t(step.title)}
                      </span>
                      <span className="mt-1.5 leading-relaxed text-mauve">{t(step.text)}</span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-rose-deep">
                        {t(step.link)}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
