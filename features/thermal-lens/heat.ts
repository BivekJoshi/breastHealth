import {
  BODY_C,
  FADE,
  FOLD_C,
  FOLDS,
  HEAT_SPOTS,
  SILHOUETTE,
  VIEW,
} from "./torso"

// Pretend skin-surface temperatures for the hero illustration.
export const AMBIENT_C = 29
export const CORE_C = 37

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/** 0–1 position of a temperature on the AMBIENT_C → CORE_C scale. */
export function heatLevel(celsius: number) {
  return clamp01((celsius - AMBIENT_C) / (CORE_C - AMBIENT_C))
}

// The --color-heat-* ramp, from cool violet to near-white.
const RAMP: [number, number, number, number][] = [
  [0, 0x3b, 0x23, 0x70],
  [0.22, 0x7b, 0x5b, 0xd6],
  [0.45, 0xe5, 0x5e, 0xa2],
  [0.66, 0xff, 0x9e, 0x7a],
  [0.84, 0xff, 0xd9, 0x8a],
  [1, 0xff, 0xf8, 0xe7],
]

/** RGB for a 0–1 heat level. */
export function heatColor(level: number): [number, number, number] {
  const i = Math.max(RAMP.findIndex(([at]) => at >= level), 1)
  const [a, ...from] = RAMP[i - 1]
  const [b, ...to] = RAMP[i]
  const t = clamp01((level - a) / (b - a))
  return [0, 1, 2].map((c) => Math.round(from[c] + (to[c] - from[c]) * t)) as [number, number, number]
}

// ─── The temperature field ──────────────────────────────────────────
// A grid over the illustration, built once in the browser. The thermal
// canvas paints it and the lens reads from it, so the readout always
// matches the colour under the lens.

const GRID = 0.6 // cells per viewBox unit
export const FIELD = { w: Math.round(VIEW.w * GRID), h: Math.round(VIEW.h * GRID) }

type HeatField = {
  celsius: Float32Array
  /** 0–1: how much of each cell is body rather than background. */
  body: Float32Array
}

let field: HeatField | null = null

/** Draws paths into a scratch canvas and returns the blurred coverage of each cell. */
function rasterise(blur: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas")
  canvas.width = FIELD.w
  canvas.height = FIELD.h
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!
  ctx.filter = `blur(${blur}px)`
  ctx.setTransform(GRID, 0, 0, GRID, 0, 0)
  ctx.lineCap = "round"
  draw(ctx)
  const { data } = ctx.getImageData(0, 0, FIELD.w, FIELD.h)
  return Float32Array.from({ length: FIELD.w * FIELD.h }, (_, i) => data[i * 4 + 3] / 255)
}

export function heatField(): HeatField {
  if (field) return field

  const body = rasterise(1.5, (ctx) => ctx.fill(new Path2D(SILHOUETTE)))
  const folds = rasterise(6, (ctx) => {
    ctx.lineWidth = 16
    for (const d of FOLDS) ctx.stroke(new Path2D(d))
  })

  const celsius = new Float32Array(FIELD.w * FIELD.h)
  for (let j = 0; j < FIELD.h; j++) {
    const y = (j + 0.5) / GRID
    // fade in and out as the drawing does
    const fade = clamp01(y / FADE.top) ** 2 * clamp01((VIEW.h - y) / FADE.bottom) ** 1.5
    for (let i = 0; i < FIELD.w; i++) {
      const x = (i + 0.5) / GRID
      const k = j * FIELD.w + i
      let t = BODY_C + folds[k] * FOLD_C
      for (const s of HEAT_SPOTS) t += s.c * Math.exp(-((x - s.x) ** 2 + (y - s.y) ** 2) / (2 * s.r ** 2))
      body[k] *= fade
      celsius[k] = AMBIENT_C + body[k] * (Math.min(t, CORE_C) - AMBIENT_C)
    }
  }

  return (field = { celsius, body })
}

/** Temperature at a point on the illustration; u and v run 0–1 across its box. */
export function temperatureAt(u: number, v: number) {
  if (u < 0 || u > 1 || v < 0 || v > 1) return AMBIENT_C
  const { celsius } = heatField()
  const x = Math.min(u * FIELD.w, FIELD.w - 1.001)
  const y = Math.min(v * FIELD.h, FIELD.h - 1.001)
  const i = Math.floor(x)
  const j = Math.floor(y)
  const fx = x - i
  const fy = y - j
  const at = (di: number, dj: number) => celsius[(j + dj) * FIELD.w + i + di]
  return (
    (at(0, 0) * (1 - fx) + at(1, 0) * fx) * (1 - fy) + (at(0, 1) * (1 - fx) + at(1, 1) * fx) * fy
  )
}
