import { useId, type SVGProps } from "react"
import { PETAL_ANGLES, PETAL_PATH, STAMENS } from "@/components/brand/gurans"

const palettes = {
  // what the eye sees
  surface: {
    petal: ["#d6336f", "#ec6f9c", "#f7a6c3", "#fbcfde", "#fde6ee"],
    glow: "#ffc2d8",
    glowOpacity: 0.55,
    edge: "rgb(255 255 255 / 0.8)",
    stamen: "#c2306a",
    anther: "#ffb84d",
    core: "#ad1f56",
  },
  // what the thermal camera sees — a soft, dreamy heat ramp
  thermal: {
    petal: ["#fff8e7", "#ffd98a", "#ff9e7a", "#e55ea2", "#7b5bd6"],
    glow: "#9b7cf0",
    glowOpacity: 0.75,
    edge: "rgb(255 248 231 / 0.25)",
    stamen: "rgb(255 248 231 / 0.9)",
    anther: "#fff8e7",
    core: "#fff8e7",
  },
}

const PETAL_STOPS = [0, 0.14, 0.34, 0.6, 1]

type GuransBloomProps = SVGProps<SVGSVGElement> & { variant: keyof typeof palettes }

/** The gurans flower, drawn either as seen by eye or by a thermal camera. */
export function GuransBloom({ variant, ...props }: GuransBloomProps) {
  const p = palettes[variant]
  const id = useId().replace(/[^\w-]/g, "")
  const fill = `${id}-petal`
  const glow = `${id}-glow`

  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={fill} cx="0" cy="0" r="96" gradientUnits="userSpaceOnUse">
          {p.petal.map((color, i) => (
            <stop key={i} offset={PETAL_STOPS[i]} stopColor={color} />
          ))}
        </radialGradient>
        <radialGradient id={glow} cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor={p.glow} stopOpacity={p.glowOpacity} />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle r="100" fill={`url(#${glow})`} />
      <g transform="scale(0.88)">
        {PETAL_ANGLES.map((a) => (
          <path
            key={a}
            d={PETAL_PATH}
            transform={`rotate(${a})`}
            fill={`url(#${fill})`}
            stroke={p.edge}
            strokeWidth="0.7"
          />
        ))}
        {STAMENS.map((s) => (
          <g key={s.d}>
            <path d={s.d} fill="none" stroke={p.stamen} strokeWidth="1.1" strokeLinecap="round" />
            <ellipse cx={s.x} cy={s.y} rx="2.6" ry="3.4" fill={p.anther} />
          </g>
        ))}
        <circle r="7" fill={p.core} />
      </g>
    </svg>
  )
}
