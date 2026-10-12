import { AccentTitle } from "@/components/brand/doodles"
import { GuransMark } from "@/components/brand/gurans-mark"
import type { SectionCopy } from "@/content/types"
import { plainTitle } from "@/i18n/i18n"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

/** Small pill holding a heading in the other language. */
export function AltTag({
  children,
  lang,
  className,
}: {
  children: React.ReactNode
  lang: string
  className?: string
}) {
  return (
    <span
      lang={lang}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/85 py-1 pr-4 pl-1.5 text-[0.95rem] font-semibold text-rose-deep shadow-sm ring-1 ring-petal",
        className
      )}
    >
      <GuransMark className="size-6" />
      {children}
    </span>
  )
}

/** The heading in the other language as a tag, then the heading, then an optional lead. */
export async function SectionIntro({
  copy,
  lead,
  id,
  center = false,
  className,
}: {
  copy: SectionCopy
  /** Already-translated lead, for copy built from live numbers. */
  lead?: string
  id?: string
  center?: boolean
  className?: string
}) {
  const { t, alt, altLocale } = await getI18n()
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <AltTag lang={altLocale}>{plainTitle(alt(copy.title))}</AltTag>
      <h2
        id={id}
        className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.08] font-semibold text-balance text-berry"
      >
        <AccentTitle title={t(copy.title)} />
      </h2>
      {(lead ?? copy.lead) && (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-mauve">{lead ?? t(copy.lead!)}</p>
      )}
    </div>
  )
}
