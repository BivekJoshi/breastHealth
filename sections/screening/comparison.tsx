import { Check, Minus } from "lucide-react"
import { WaveEdge } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { comparison, comparisonCopy } from "@/content/screening"
import { getI18n } from "@/i18n/server"

export async function Comparison() {
  const { t } = await getI18n()

  const mark = (yes: boolean) =>
    yes ? (
      <span className="inline-flex items-center gap-2 font-bold text-rose-deep">
        <span className="grid size-7 place-items-center rounded-full bg-rose text-white">
          <Check className="size-4" strokeWidth={3} aria-hidden />
        </span>
        {t(comparisonCopy.yes)}
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 text-mauve">
        <span className="grid size-7 place-items-center rounded-full bg-lilac">
          <Minus className="size-4" aria-hidden />
        </span>
        {t(comparisonCopy.no)}
      </span>
    )

  return (
    <section aria-labelledby="compare">
      <WaveEdge className="text-blush" />
      <div className="bg-blush">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <SectionIntro id="compare" copy={comparisonCopy} />
          <div className="mt-12 overflow-x-auto rounded-[2.25rem] bg-white p-3 shadow-soft sm:p-5">
            <table className="w-full min-w-136 text-left">
              <thead>
                <tr className="text-sm font-extrabold text-mauve">
                  <th scope="col" className="px-5 py-4">
                    <span className="sr-only">{t(comparisonCopy.feature)}</span>
                  </th>
                  <th scope="col" className="px-5 py-4">
                    <span className="rounded-full bg-blush px-3 py-1 text-rose-deep">{t(comparisonCopy.thermal)}</span>
                  </th>
                  <th scope="col" className="px-5 py-4">
                    <span className="rounded-full bg-lilac px-3 py-1">{t(comparisonCopy.mammography)}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label.en} className={i % 2 === 0 ? "bg-paper" : undefined}>
                    <th scope="row" className="rounded-l-2xl px-5 py-4 font-display text-lg font-semibold">
                      {t(row.label)}
                    </th>
                    <td className="px-5 py-4">{mark(row.thermal)}</td>
                    <td className="rounded-r-2xl px-5 py-4">{mark(row.mammography)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <WaveEdge flip className="text-blush" />
    </section>
  )
}
