"use client"

import { useId, useRef, useState } from "react"
import { Heart } from "lucide-react"
import { bodyMapCopy } from "@/content/awareness"
import { useI18n } from "@/i18n/client"
import { BodyMapCard, BodyMapPoints } from "./body-map"
import { AMBIENT_C, CORE_C } from "./heat"
import { ThermalTorso, TorsoLineArt } from "./torso-figure"
import { useThermalLens } from "./use-thermal-lens"

/**
 * A thermal camera's viewfinder: a body in fine line art, with a lens that
 * reveals it as the camera sees it, and points for what a screening looks at.
 * The lens follows the pointer over the viewfinder and otherwise rests on the
 * chosen point. The panel under the viewfinder, in the same frame, explains that point.
 */
export function ThermalLens({ className, hint }: { className?: string; hint: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { locale, num, t } = useI18n()
  const cardId = useId()
  const [active, setActive] = useState(0)
  useThermalLens(ref, locale, { active, onStop: setActive })
  const deg = (c: number) => num(c, { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-petal/80">
        <div
          ref={ref}
          className="thermal-lens group/lens relative isolate aspect-[400/380] overflow-hidden bg-white"
        >
          {/* what the eye sees */}
          <TorsoLineArt data-heat-source className="pointer-events-none absolute inset-0 -z-20 size-full" />

          {/* what the camera sees — visible only through the lens */}
          <div aria-hidden className="lens-window absolute inset-0 -z-10 bg-heat-0">
            <ThermalTorso className="absolute inset-0 size-full" />
          </div>

          <Viewfinder from={`${num(AMBIENT_C)}°`} to={`${num(CORE_C)}°`} />

          <BodyMapPoints className="absolute inset-0" cardId={cardId} active={active} onSelect={setActive} />

          <Reticle initial={`${deg(AMBIENT_C)}°C`} />
        </div>

        <BodyMapCard id={cardId} active={active} onSelect={setActive} className="border-t border-petal/80" />
      </div>

      <p className="mt-3 text-center text-xs font-bold text-mauve">
        {hint}
        <span className="sm:hidden"> · {t(bodyMapCopy.note)}</span>
      </p>
    </div>
  )
}

/** The camera's frame: corner marks, what it is showing, and its temperature scale. */
function Viewfinder({ from, to }: { from: string; to: string }) {
  const { t } = useI18n()
  const corner = "absolute size-5 border-rose/30"

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`${corner} top-3 left-3 rounded-tl-lg border-t-2 border-l-2`} />
      <span className={`${corner} top-3 right-3 rounded-tr-lg border-t-2 border-r-2`} />
      <span className={`${corner} bottom-3 left-3 rounded-bl-lg border-b-2 border-l-2`} />
      <span className={`${corner} right-3 bottom-3 rounded-br-lg border-r-2 border-b-2`} />

      <div className="absolute inset-x-10 top-4 flex items-center justify-between gap-3 text-[0.7rem] whitespace-nowrap">
        <span className="flex items-center gap-1.5 font-extrabold tracking-wider text-rose-deep uppercase">
          <span className="size-1.5 rounded-full bg-rose" />
          {t(bodyMapCopy.view)}
        </span>
        <span className="hidden font-bold text-mauve sm:inline">{t(bodyMapCopy.note)}</span>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[0.7rem] font-bold text-mauve tabular-nums">
        {from}
        <span className="relative h-1.5 w-24 rounded-full bg-linear-to-r from-heat-1 via-heat-2 via-55% to-heat-4 sm:w-32">
          <span
            className="absolute top-1/2 size-3 -translate-1/2 rounded-full border-2 border-white bg-rose shadow-sm"
            style={{ left: "calc(var(--heat, 0) * 100%)" }}
          />
        </span>
        {to}
      </div>
    </div>
  )
}

function Reticle({ initial }: { initial: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-20 opacity-0 transition-opacity duration-700 group-data-live/lens:opacity-100"
      style={{
        width: "calc(var(--lens-r) * 2)",
        height: "calc(var(--lens-r) * 2)",
        translate: "calc(var(--x) - var(--lens-r)) calc(var(--y) - var(--lens-r))",
      }}
    >
      <svg viewBox="0 0 100 100" className="size-full overflow-visible">
        <circle
          cx="50"
          cy="50"
          r="49.4"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="rgb(255 255 255 / 0.55)"
          strokeWidth="1"
          strokeDasharray="2 5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute top-[84%] left-[84%] flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-3 pl-2 text-sm font-extrabold whitespace-nowrap text-berry shadow-soft">
        <Heart className="size-3.5 fill-rose text-rose" />
        <span data-heat-readout className="tabular-nums">
          {initial}
        </span>
      </div>
    </div>
  )
}
