import { Feather, ShieldCheck, Smile } from "lucide-react"
import { SectionIntro } from "@/components/common/section-intro"
import { promisesCopy } from "@/content/home"
import { promises } from "@/content/screening"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const look = {
  radiation: { icon: ShieldCheck, card: "bg-blush", ink: "text-rose" },
  touch: { icon: Feather, card: "bg-lilac", ink: "text-lilac-deep" },
  pain: { icon: Smile, card: "bg-peach", ink: "text-[#c4532a]" },
}

export async function Promises() {
  const { t, alt, altLocale } = await getI18n()
  return (
    <section aria-labelledby="promises" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionIntro id="promises" center copy={promisesCopy} />

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {promises.map((p) => {
          const { icon: Icon, card, ink } = look[p.id]
          return (
            <li
              key={p.id}
              className={cn(
                "group rounded-[2.25rem] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-9",
                card
              )}
            >
              <span
                className={cn(
                  "grid size-16 place-items-center rounded-full bg-white shadow-soft transition-transform duration-300 group-hover:rotate-[-8deg]",
                  ink
                )}
              >
                <Icon className="size-7" strokeWidth={2.2} />
              </span>
              <p lang={altLocale} className="mt-7 text-lg font-semibold text-rose-deep">
                {alt(p.title)}
              </p>
              <h3 className="mt-1 font-display text-[2.4rem] leading-tight font-semibold">{t(p.title)}</h3>
              <p className="mt-3 text-lg leading-relaxed text-mauve">{t(p.detail)}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
