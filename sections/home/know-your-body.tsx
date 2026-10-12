import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Floaters, WaveEdge } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { awarenessCopy, riskFactors, seeADoctor, warningSigns } from "@/content/awareness"
import type { Bilingual } from "@/content/types"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

const chipTones = ["bg-white", "bg-blush", "bg-peach"]

export async function KnowYourBody() {
  const { t, alt, altLocale, href } = await getI18n()

  const listLabel = (text: Bilingual) => (
    <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-semibold">
      {t(text)}
      <span lang={altLocale} className="text-lg font-semibold text-lilac-deep">
        {alt(text)}
      </span>
    </h3>
  )

  return (
    <section aria-labelledby="know">
      <WaveEdge className="text-lilac" />
      <div className="bg-lilac">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <SectionIntro id="know" copy={awarenessCopy} />

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              {listLabel(awarenessCopy.signsLabel)}
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {warningSigns.map((s) => (
                  <li key={s.en} className="rounded-[1.75rem] bg-white p-6 shadow-soft">
                    <span aria-hidden className="block size-3 rounded-full bg-rose ring-4 ring-blush" />
                    <p className="mt-4 text-xl leading-snug font-semibold">{t(s)}</p>
                    <p lang={altLocale} className="mt-1 text-mauve">
                      {alt(s)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {listLabel(awarenessCopy.risksLabel)}
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {riskFactors.map((r, i) => (
                  <li key={r.en} className={`rounded-[1.25rem] px-4 py-3 shadow-sm ${chipTones[i % chipTones.length]}`}>
                    <span className="block leading-snug font-semibold">{t(r)}</span>
                    <span lang={altLocale} className="text-sm text-mauve">
                      {alt(r)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="on-rose relative isolate mt-14 flex flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-linear-to-r from-rose to-[#e0508a] p-8 text-white shadow-lift sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <Floaters
              items={[
                { kind: "sparkle", className: "top-5 right-[30%] size-5 text-heat-4", delay: 0.5 },
                { kind: "petal", className: "-bottom-2 right-[38%] size-9 text-white/20", tilt: 30 },
              ]}
            />
            <div className="max-w-3xl">
              <p className="text-2xl leading-snug font-bold sm:text-[1.7rem]">{t(seeADoctor)}</p>
              <p lang={altLocale} className="mt-2 text-white/90">
                {alt(seeADoctor)}
              </p>
            </div>
            <Button asChild size="xl" variant="inverse" className="shrink-0">
              <Link href={href(paths.book)}>
                {t(awarenessCopy.talkToDoctor)}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <WaveEdge flip className="text-lilac" />
    </section>
  )
}
