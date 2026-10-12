import { Heart } from "lucide-react"
import { WaveEdge } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { visitCopy } from "@/content/home"
import { visit } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const tone = [
  { bar: "bg-petal text-rose-deep", dot: "bg-petal" },
  { bar: "bg-[#f27aa5] text-white", dot: "bg-[#f27aa5]" },
  { bar: "bg-rose text-white", dot: "bg-rose" },
]

export async function VisitTimeline() {
  const { t, num } = await getI18n()
  const { stages, finish, totalMinutes } = visit
  return (
    <section aria-labelledby="visit">
      <WaveEdge className="text-blush" />
      <div className="bg-blush">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <SectionIntro id="visit" copy={visitCopy} />

          {/* One bar, each segment sized by its real share of the visit. */}
          <div
            className="mt-14 flex items-center gap-1.5 rounded-full bg-white p-1.5 shadow-soft"
            role="img"
            aria-label={stages.map((s) => `${t(s.title)}: ${t(visitCopy.barLabel)(num(s.minutes))}`).join(", ")}
          >
            {stages.map((s, i) => (
              <div
                key={s.start}
                className={cn(
                  "flex h-10 min-w-0 items-center justify-center rounded-full text-sm font-extrabold whitespace-nowrap tabular-nums",
                  tone[i].bar
                )}
                style={{ flexGrow: s.minutes, flexBasis: 0 }}
              >
                <span className="sm:hidden">{t(visitCopy.barShort)(num(s.minutes))}</span>
                <span className="hidden sm:inline">{t(visitCopy.barLabel)(num(s.minutes))}</span>
              </div>
            ))}
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-berry text-white">
              <Heart className="size-4 fill-current" />
            </span>
          </div>
          <p className="mt-3 text-right text-sm font-bold text-mauve">{t(visitCopy.total)(num(totalMinutes))}</p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.start} className="rounded-[2rem] bg-white p-6 shadow-soft">
                <span className="flex items-center gap-2 text-sm font-extrabold text-rose-deep tabular-nums">
                  <span className={cn("size-3 rounded-full", tone[i].dot)} />
                  {t(visitCopy.range)(num(s.start), num(s.start + s.minutes))}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{t(s.title)}</h3>
                <p className="mt-2 leading-relaxed text-mauve">{t(s.text)}</p>
              </li>
            ))}
            <li className="on-rose rounded-[2rem] bg-rose p-6 text-white shadow-soft">
              <span className="flex items-center gap-2 text-sm font-extrabold tabular-nums">
                <Heart className="size-3.5 fill-current" />
                {t(visitCopy.barLabel)(num(totalMinutes))}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{t(finish.title)}</h3>
              <p className="mt-2 leading-relaxed text-white/90">{t(finish.text)}</p>
            </li>
          </ol>
        </div>
      </div>
      <WaveEdge flip className="text-blush" />
    </section>
  )
}
