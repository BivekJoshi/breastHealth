import type { bodyMap } from "@/content/awareness"

// Geometry for the hero's body illustration: a front view from the neck to
// just below the breasts, drawn in a 400 × 380 viewBox. The paths run on past
// the bottom edge, where the drawing fades out. Being a front view, the
// person's left side is on the viewer's right.

export const VIEW = { w: 400, h: 380 }

/** The drawing fades in over the neck and out below the breasts. */
export const FADE = { top: 90, bottom: 70 }

/** Reflects a path drawn on the viewer's left onto the right. Points must be absolute "x y" pairs. */
export const mirror = (d: string) =>
  d.replace(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (_, x, y) => `${VIEW.w - Number(x)} ${y}`)

/** Neck, shoulder and arm, down to the bottom edge. */
export const OUTLINE = "M 166 0 C 168 20, 170 36, 166 50 C 150 64, 110 70, 80 80 C 50 90, 34 116, 30 156 C 26 230, 36 360, 44 460"

/** The whole figure, for filling. */
export const SILHOUETTE =
  `${OUTLINE} L 356 460 C 364 360, 374 230, 370 156 C 366 116, 350 90, 320 80 ` +
  "C 290 70, 250 64, 234 50 C 230 36, 232 20, 234 0 Z"

/** Where the arm meets the chest, running down the side of the body. */
export const SIDE = "M 62 126 C 74 146, 84 164, 86 188 C 90 252, 94 340, 100 460"

export const COLLARBONE = "M 108 98 C 132 102, 162 104, 188 95"

/** The lower curve of the breast. */
export const BREAST = "M 90 200 C 86 262, 110 304, 146 304 C 174 304, 192 288, 196 266"

export const NIPPLE = { x: 140, y: 254 }

/** The centre of the chest, which the AI compares either side of. */
export const MIDLINE_X = VIEW.w / 2

/** Where each fact sits on the drawing. */
export const POINTS: Record<(typeof bodyMap)[number]["id"], { x: number; y: number }> = {
  symmetry: { x: MIDLINE_X, y: 226 },
  upperOuter: { x: 288, y: 216 },
  armpit: { x: 76, y: 170 },
  nipple: NIPPLE,
}

// ─── What the thermal camera sees ───────────────────────────────────
// Pretend skin temperatures in °C, built up from the drawing above: a healthy,
// symmetric pattern, so both sides match.

export const BODY_C = 31.6

const NIPPLE_RIGHT = { x: VIEW.w - NIPPLE.x, y: NIPPLE.y }

/** Warm or cool areas: degrees added at the centre, fading out over radius r. */
export const HEAT_SPOTS = [
  { x: 200, y: 64, r: 52, c: 2.2 }, // neck and upper chest
  { x: 200, y: 214, r: 32, c: 1.2 }, // breastbone
  { x: 78, y: 166, r: 22, c: 4.2 }, // armpits run warm
  { x: 322, y: 166, r: 22, c: 4.2 },
  ...[NIPPLE, NIPPLE_RIGHT].flatMap(({ x, y }) => [
    { x, y: y - 2, r: 40, c: 3 }, // breast tissue
    { x, y, r: 5, c: 1.4 }, // nipple
  ]),
  { x: 36, y: 340, r: 64, c: -1.6 }, // arms run cool
  { x: 364, y: 340, r: 64, c: -1.6 },
]

/** The fold under each breast holds warmth. */
export const FOLDS = [BREAST, mirror(BREAST)]
export const FOLD_C = 2.2

/** Blood vessels show up as warm lines, alike on both sides. */
const LEFT_VESSELS = [
  "M 182 150 C 172 178, 156 200, 150 232",
  "M 112 196 C 124 212, 132 226, 138 240",
  "M 186 232 C 176 244, 164 250, 152 252",
]
export const VESSELS = [...LEFT_VESSELS, ...LEFT_VESSELS.map(mirror)]
export const VESSEL_C = 1.4

/** The part of the thermal view the home hero's scan window shows: the chest. */
export const SCAN = { x: 60, y: 160, w: 280, h: 170 }
