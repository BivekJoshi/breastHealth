import { useId } from "react"
import {
  RIBBON_BACK,
  RIBBON_CROSSING,
  RIBBON_FRONT,
  RIBBON_NOTCHES,
  RIBBON_PATH,
  RIBBON_VIEWBOX,
  RIBBON_WIDTH,
} from "@/components/brand/ribbon"
import { cn } from "@/lib/utils"

/** A mask that cuts the V notches out of both tails. */
function NotchMask({ id }: { id: string }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="164">
      <rect width="120" height="164" fill="#fff" />
      <path d={RIBBON_NOTCHES} fill="#000" />
    </mask>
  )
}

/**
 * The pink awareness ribbon. When animated it draws itself in, then sways
 * gently with a glint running along it now and then (see globals.css); people
 * who prefer reduced motion get it still.
 */
export function PinkRibbon({ className, animated = true }: { className?: string; animated?: boolean }) {
  const id = useId().replace(/[^\w-]/g, "")
  const satin = `${id}-satin`
  const notches = `${id}-notches`
  const under = `${id}-under`
  const body = `${id}-body`
  const blur = `${id}-blur`
  const soften = `${id}-soften`

  return (
    <svg
      viewBox={RIBBON_VIEWBOX}
      fill="none"
      aria-hidden="true"
      data-animated={animated || undefined}
      className={cn("pink-ribbon", className)}
    >
      <defs>
        <linearGradient id={satin} gradientUnits="userSpaceOnUse" x1="30" y1="8" x2="90" y2="160">
          <stop offset="0" stopColor="#ff8dba" />
          <stop offset="0.55" stopColor="#e2467f" />
          <stop offset="1" stopColor="#b81d58" />
        </linearGradient>
        <NotchMask id={notches} />
        {/* the crossing's shadow only falls on the strand behind it */}
        <mask id={under} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="164">
          <path d={RIBBON_BACK} stroke="#fff" strokeWidth={RIBBON_WIDTH} />
        </mask>
        {/* …and the glint stays on the ribbon */}
        <mask id={body} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="164">
          <path d={RIBBON_PATH} stroke="#fff" strokeWidth={RIBBON_WIDTH} />
        </mask>
        <filter id={blur} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        <filter id={soften} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <g mask={`url(#${notches})`} strokeWidth={RIBBON_WIDTH}>
        <path className="ribbon-strand" d={RIBBON_BACK} stroke={`url(#${satin})`} pathLength={1} />
        <g mask={`url(#${under})`}>
          <path
            className="ribbon-shade"
            d={RIBBON_CROSSING}
            stroke="#4a1a33"
            strokeOpacity="0.4"
            strokeWidth={RIBBON_WIDTH + 3}
            transform="translate(0 1.2)"
            filter={`url(#${blur})`}
          />
        </g>
        <path className="ribbon-strand ribbon-front" d={RIBBON_FRONT} stroke={`url(#${satin})`} pathLength={1} />
        {animated && (
          <path
            className="ribbon-glint"
            d={RIBBON_PATH}
            stroke="#fff"
            strokeWidth={RIBBON_WIDTH + 8}
            pathLength={1}
            filter={`url(#${soften})`}
            mask={`url(#${body})`}
          />
        )}
      </g>
    </svg>
  )
}

/** The ribbon as a flat shape in the current text colour, for small decorations. */
export function RibbonGlyph({ className }: { className?: string }) {
  const notches = `${useId().replace(/[^\w-]/g, "")}-notches`
  return (
    <svg viewBox={RIBBON_VIEWBOX} fill="none" aria-hidden="true" className={className}>
      <defs>
        <NotchMask id={notches} />
      </defs>
      <path d={RIBBON_PATH} mask={`url(#${notches})`} stroke="currentColor" strokeWidth={RIBBON_WIDTH} />
    </svg>
  )
}

/**
 * A round seal: the ribbon in the middle, with `text` running round the rim
 * (`repeat` times, when it's short) and turning slowly. Screen readers get `label`.
 */
export function RibbonSeal({
  text,
  repeat = 1,
  label,
  className,
}: {
  text: string
  repeat?: number
  label: string
  className?: string
}) {
  const rim = `${useId().replace(/[^\w-]/g, "")}-rim`
  return (
    <div
      className={cn(
        "relative grid aspect-square place-items-center rounded-full bg-white shadow-lift ring-1 ring-petal/60",
        className
      )}
    >
      <svg viewBox="-100 -100 200 200" aria-hidden="true" className="absolute inset-0 size-full motion-safe:animate-orbit">
        <defs>
          <path id={rim} d="M-78 0A78 78 0 1 1 78 0A78 78 0 1 1-78 0" />
        </defs>
        <text className="fill-rose-deep font-display whitespace-pre text-[15.5px] font-semibold tracking-[0.08em] uppercase [&:lang(ne)]:tracking-normal">
          {/* stretched just enough to meet itself; stretched far, Devanagari comes apart */}
          <textPath href={`#${rim}`} textLength={490} lengthAdjust="spacing">
            {text.repeat(repeat)}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[21%] rounded-full bg-blush" />
      <PinkRibbon className="relative h-[46%]" />
      <span className="sr-only">{label}</span>
    </div>
  )
}
