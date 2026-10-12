"use client"

import { bodyMap, bodyMapCopy } from "@/content/awareness"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"
import { POINTS, VIEW } from "./torso"

/**
 * Points over the body illustration, like a thermal camera's measuring spots.
 * The lens rests on the active one ([data-lens-stop]); the card with `cardId`
 * explains it.
 */
export function BodyMapPoints({
  className,
  cardId,
  active,
  onSelect,
}: {
  /** Must put this box exactly over the illustration. */
  className: string
  cardId: string
  active: number
  onSelect: (index: number) => void
}) {
  const { t } = useI18n()

  return (
    <div role="group" aria-label={t(bodyMapCopy.label)} className={cn("pointer-events-none", className)}>
      {bodyMap.map((p, i) => {
        const { x, y } = POINTS[p.id]
        return (
          <button
            key={p.id}
            type="button"
            data-lens-stop
            data-active={i === active || undefined}
            aria-controls={cardId}
            aria-current={i === active || undefined}
            onFocus={() => onSelect(i)}
            onClick={() => onSelect(i)}
            className="group/pin pointer-events-auto absolute grid size-10 -translate-1/2 place-items-center rounded-full"
            style={{ left: `${(x / VIEW.w) * 100}%`, top: `${(y / VIEW.h) * 100}%` }}
          >
            <span
              aria-hidden
              className="grid size-5 place-items-center rounded-full border-2 border-rose bg-white shadow-sm transition-transform duration-200 group-hover/pin:scale-110 group-data-active/pin:border-white group-data-active/pin:bg-rose"
            >
              <span className="size-1.5 rounded-full bg-rose group-data-active/pin:bg-white" />
            </span>
            <span className="sr-only">{t(p.title)}</span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * Explains the active point, with a button for each so all four are in reach.
 * Every explanation is laid out in the same cell, so the panel is as tall as the
 * longest and doesn't jump as the lens moves between points.
 */
export function BodyMapCard({
  id,
  active,
  onSelect,
  className,
}: {
  id: string
  active: number
  onSelect: (index: number) => void
  className?: string
}) {
  const { t } = useI18n()

  return (
    <div className={cn("p-5 sm:px-7 sm:py-6", className)}>
      <div id={id} className="grid">
        {bodyMap.map((p, i) => (
          <div key={p.id} className={cn("col-start-1 row-start-1", i !== active && "invisible")}>
            <p className="text-xs font-extrabold tracking-wider text-rose-deep uppercase">{t(p.kicker)}</p>
            <p className="mt-1.5 font-display text-2xl leading-tight font-semibold">{t(p.title)}</p>
            <p className="mt-2 leading-relaxed text-pretty text-mauve">{t(p.text)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {bodyMap.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-controls={id}
            aria-current={i === active || undefined}
            onClick={() => onSelect(i)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[0.8rem] font-bold ring-1 transition-colors",
              i === active ? "bg-rose text-white ring-rose" : "bg-white text-berry ring-petal hover:bg-blush"
            )}
          >
            {t(p.short)}
          </button>
        ))}
      </div>
    </div>
  )
}
