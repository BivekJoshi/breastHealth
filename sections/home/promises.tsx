import { Feather, ShieldCheck, Smile } from "lucide-react"
import { Floaters, Petal, Sparkle, WaveEdge } from "@/components/brand/doodles"
import { SectionIntro } from "@/components/common/section-intro"
import { promisesCopy } from "@/content/home"
import { promises } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const look = {
  radiation: { icon: ShieldCheck, cap: "bg-blush", wave: "text-blush", ink: "text-rose" },
  touch: { icon: Feather, cap: "bg-lilac", wave: "text-lilac", ink: "text-lilac-deep" },
  pain: { icon: Smile, cap: "bg-peach", wave: "text-peach", ink: "text-[#c4532a]" },
}

export async function Promises() {
  const { t, alt, altLocale } = await getI18n()
  return (
    <section aria-labelledby="promises">
      {/* two waves, mirrored, so their crests interleave like ribbon */}
      <div className="relative h-12 sm:h-16">
        <WaveEdge className="absolute inset-x-0 bottom-0 h-12 -scale-x-100 text-petal/70 sm:h-16" />
        <WaveEdge className="absolute inset-x-0 bottom-0 text-blush" />
      </div>

      <div className="relative bg-linear-to-b from-blush to-paper">
        <Floaters
          items={[
            { kind: "petal", className: "top-6 left-[7%] hidden size-8 text-petal sm:block", tilt: -24 },
            { kind: "sparkle", className: "top-24 left-[15%] hidden size-4 text-rose/40 sm:block", delay: 0.6 },
            { kind: "petal", className: "top-14 right-[9%] size-10 text-petal", tilt: 32, delay: 1.2 },
            { kind: "sparkle", className: "top-6 right-[19%] size-5 text-lilac-deep/30", delay: 1.6 },
          ]}
        />

        <div className="relative mx-auto max-w-7xl px-5 pt-8 pb-20 sm:pt-10 sm:pb-28">
          <SectionIntro id="promises" center copy={promisesCopy} />

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {promises.map((p) => {
              const { icon: Icon, cap, wave, ink } = look[p.id]
              return (
                <li
                  key={p.id}
                  className="group overflow-hidden rounded-[2.25rem] bg-white shadow-soft ring-1 ring-petal/50 transition duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-lift"
                >
                  {/* pastel cap with a wavy hem */}
                  <div className={cn("relative px-8 pt-8 pb-3 sm:px-9", cap)}>
                    <span
                      className={cn(
                        "grid size-16 place-items-center rounded-full bg-white shadow-soft transition-transform duration-300 group-hover:rotate-[-8deg]",
                        ink
                      )}
                    >
                      <Icon className="size-7" strokeWidth={2.2} />
                    </span>
                    <Petal className="absolute top-5 right-8 size-12 rotate-28 text-white/80" />
                    <Sparkle className={cn("absolute top-16 right-24 size-4 opacity-40", ink)} />
                  </div>
                  <WaveEdge flip className={cn("h-5 sm:h-6", wave)} />

                  <div className="px-8 pt-3 pb-9 sm:px-9">
                    <p lang={altLocale} className="text-lg font-semibold text-rose-deep">
                      {alt(p.title)}
                    </p>
                    <h3 className="mt-1 font-display text-[2.4rem] leading-tight font-semibold">{t(p.title)}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-mauve">{t(p.detail)}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
