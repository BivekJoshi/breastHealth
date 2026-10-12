import { Heart } from "lucide-react"
import { Sparkle, WaveEdge } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { visitCopy } from "@/content/home"
import { visit } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const tone = [
  { node: "bg-petal text-rose-deep", stroke: "stroke-petal" },
  { node: "bg-[#f27aa5] text-white", stroke: "stroke-[#f27aa5]" },
  { node: "bg-rose text-white", stroke: "stroke-rose" },
]

// The clock ring. GAP is measured along the ring and covers the two round caps.
const R = 52
const RING = 2 * Math.PI * R
const STROKE = 12
const GAP = STROKE + 4

export async function VisitTimeline() {
  const { t, num } = await getI18n()
  const { stages, finish, totalMinutes } = visit
  const share = (minutes: number) => (minutes / totalMinutes) * RING

  return (
    <section aria-labelledby="visit">
      <WaveEdge className="text-blush" />
      <div className="bg-blush">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <SectionIntro id="visit" copy={visitCopy} />

            {/* A clock face: each arc is that stage's real share of the visit, starting at 12. */}
            <div
              role="img"
              aria-label={`${t(visitCopy.total)(num(totalMinutes))}: ${stages
                .map((s) => `${t(s.title)}, ${t(visitCopy.barLabel)(num(s.minutes))}`)
                .join("; ")}`}
              className="relative size-44 rounded-full bg-white p-2.5 shadow-soft sm:size-52 lg:mr-10"
            >
              <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full -rotate-90">
                {stages.map((s, i) => (
                  <circle
                    key={s.start}
                    cx="60"
                    cy="60"
                    r={R}
                    fill="none"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${share(s.minutes) - GAP} ${RING}`}
                    strokeDashoffset={-(share(s.start) + GAP / 2)}
                    className={tone[i].stroke}
                  />
                ))}
              </svg>
              <span className="absolute inset-0 grid place-content-center text-center">
                <span className="font-display text-5xl leading-none font-semibold text-berry tabular-nums sm:text-6xl">
                  {num(totalMinutes)}
                </span>
                <span className="mt-1 text-sm font-bold text-mauve">{t(visitCopy.unit)}</span>
              </span>
              {/* the finish line, at 12 o'clock */}
              <span className="absolute top-[7.5%] left-1/2 grid size-7 -translate-1/2 place-items-center rounded-full bg-berry text-white ring-4 ring-white sm:size-8">
                <Heart className="size-3.5 fill-current" />
              </span>
              <Sparkle className="absolute -top-1 -right-3 size-5 text-rose/40" />
            </div>
          </div>

          {/* Vertical on phones, a horizontal track from lg up. */}
          <ol className="mt-14 grid gap-4 lg:grid-cols-4 lg:gap-5">
            {stages.map((s, i) => (
              <li key={s.start} className="group relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 lg:flex lg:flex-col">
                <span
                  aria-hidden
                  className="absolute top-12 -bottom-4 left-6 border-l-2 border-dashed border-rose/25 lg:top-6 lg:-right-5 lg:bottom-auto lg:left-12 lg:border-t-2 lg:border-l-0"
                />
                <span
                  className={cn(
                    "relative grid size-12 place-items-center rounded-full font-display text-lg font-semibold shadow-soft ring-4 ring-blush transition-transform duration-300 ease-soft group-hover:scale-110",
                    tone[i].node
                  )}
                >
                  {num(i + 1)}
                </span>
                <div className="rounded-[1.75rem] bg-white p-6 shadow-soft lg:flex-1">
                  <span className="inline-flex rounded-full bg-blush px-3 py-1 text-xs font-extrabold text-rose-deep tabular-nums">
                    {t(visitCopy.range)(num(s.start), num(s.start + s.minutes))}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{t(s.title)}</h3>
                  <p className="mt-2 leading-relaxed text-mauve">{t(s.text)}</p>
                </div>
              </li>
            ))}
            <li className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-4 lg:flex lg:flex-col">
              <span className="grid size-12 place-items-center rounded-full bg-berry text-white shadow-soft ring-4 ring-blush transition-transform duration-300 ease-soft group-hover:scale-110">
                <Heart className="size-5 fill-current" />
              </span>
              <div className="on-rose rounded-[1.75rem] bg-linear-to-br from-rose to-[#e0508a] p-6 text-white shadow-lift lg:flex-1">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold tabular-nums">
                  {t(visitCopy.barLabel)(num(totalMinutes))}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{t(finish.title)}</h3>
                <p className="mt-2 leading-relaxed text-white/90">{t(finish.text)}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <WaveEdge flip className="text-blush" />
    </section>
  )
}
