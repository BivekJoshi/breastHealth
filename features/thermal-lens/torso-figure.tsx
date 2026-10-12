"use client"

import { useEffect, useId, useRef, type SVGProps } from "react"
import { FIELD, heatColor, heatField, heatLevel } from "./heat"
import {
  BREAST,
  COLLARBONE,
  FADE,
  MIDLINE_X,
  mirror,
  NIPPLE,
  OUTLINE,
  SIDE,
  SILHOUETTE,
  VIEW,
} from "./torso"

const both = (d: string) => [d, mirror(d)]
const NIPPLES = [NIPPLE, { x: VIEW.w - NIPPLE.x, y: NIPPLE.y }]

/** The body as the eye sees it: soft line art with the guides a reader works from. */
export function TorsoLineArt(props: SVGProps<SVGSVGElement>) {
  const id = useId().replace(/[^\w-]/g, "")

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd3e2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd3e2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2={VIEW.h} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" />
          <stop offset={FADE.top / VIEW.h} stopColor="#fff" />
          <stop offset={1 - FADE.bottom / VIEW.h} stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW.w} height={VIEW.h}>
          <rect width={VIEW.w} height={VIEW.h} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <ellipse cx={MIDLINE_X} cy="230" rx="190" ry="170" fill={`url(#${id}-glow)`} />
        <path d={SILHOUETTE} fill="#fff1f6" />

        <g fill="none" stroke="#e17aa0" strokeWidth="1.6" strokeLinecap="round">
          {[...both(OUTLINE), ...both(SIDE), ...both(BREAST)].map((d) => (
            <path key={d} d={d} />
          ))}
          {both(COLLARBONE).map((d) => (
            <path key={d} d={d} strokeOpacity="0.5" />
          ))}
        </g>

        {/* the reading guides: a centre line, and four quadrants on each side */}
        <g fill="none" stroke="#cf2f6a" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 5">
          <path d={`M ${MIDLINE_X} 112 V ${VIEW.h}`} />
          {NIPPLES.map(({ x, y }) => (
            <g key={x}>
              <circle cx={x} cy={y} r="56" />
              <path d={`M ${x - 56} ${y} H ${x + 56} M ${x} ${y - 56} V ${y + 56}`} strokeOpacity="0.6" />
            </g>
          ))}
        </g>

        {NIPPLES.map(({ x, y }) => (
          <g key={x}>
            <circle cx={x} cy={y} r="9" fill="#fbc4d7" />
            <circle cx={x} cy={y} r="2.6" fill="#e17aa0" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/** The same body as a thermal camera sees it, painted from the temperature field. */
export function ThermalTorso({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx) return
    const { celsius, body } = heatField()
    const image = ctx.createImageData(FIELD.w, FIELD.h)
    for (let k = 0; k < celsius.length; k++) {
      const [r, g, b] = heatColor(heatLevel(celsius[k]))
      image.data.set([r, g, b, Math.round(body[k] * 255)], k * 4)
    }
    ctx.putImageData(image, 0, 0)
  }, [])

  return <canvas ref={ref} width={FIELD.w} height={FIELD.h} aria-hidden className={className} style={style} />
}
