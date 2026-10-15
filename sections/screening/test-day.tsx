import { Check } from "lucide-react"
import { AltTag } from "@/components/common/section-intro"
import { eligibility, preparation } from "@/content/screening"
import type { Bilingual } from "@/content/types"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

async function ChecklistCard({
  id,
  list,
  className,
}: {
  id: string
  list: { title: Bilingual; items: Bilingual[] }
  className: string
}) {
  const { t, alt, altLocale } = await getI18n()
  return (
    <section aria-labelledby={id} className={cn("rounded-[2.5rem] p-8 sm:p-10", className)}>
      <AltTag lang={altLocale}>{alt(list.title)}</AltTag>
      <h2 id={id} className="mt-5 font-display text-[clamp(2rem,3.6vw,2.75rem)] leading-tight font-semibold text-navy">
        {t(list.title)}
      </h2>
      <ul className="mt-7 space-y-4">
        {list.items.map((item) => (
          <li key={item.en} className="flex gap-4 text-lg leading-relaxed">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-white text-rose shadow-sm">
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </span>
            {t(item)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function TestDay() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-5 pt-20 sm:pt-28 lg:grid-cols-2">
      <ChecklistCard id="who" list={eligibility} className="bg-lilac" />
      <ChecklistCard id="prepare" list={preparation} className="bg-peach" />
    </div>
  )
}
