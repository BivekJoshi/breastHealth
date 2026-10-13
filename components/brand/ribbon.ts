// Geometry for the pink awareness ribbon: a 16-wide stroke in a 120 × 164
// viewBox, looping over the top and crossing itself at 60,97.

export const RIBBON_VIEWBOX = "0 0 120 164"
export const RIBBON_WIDTH = 16

/** Left tail, up through the crossing, round the loop and back down. Drawn first. */
export const RIBBON_BACK =
  "M26 152C39 131 51 113 60 97C71 78 87 61 86 40C85 21 73 11 60 11C47 11 35 21 34 40C33 61 49 78 60 97"

/** The strand that crosses in front: from partway down the loop to the right tail. */
export const RIBBON_FRONT = "M40.97 66.47C46.39 76.7 53.95 86.55 60 97C69 113 81 131 94 152"

/** The front strand around the crossing, where it casts its shadow. */
export const RIBBON_CROSSING = "M50.25 81.65C53.57 86.7 56.98 91.78 60 97C64.5 105 69.75 113.5 75.5 122.62"

/** The whole ribbon as one stroke, tail to tail. */
export const RIBBON_PATH = `${RIBBON_BACK}C69 113 81 131 94 152`

/** V-shaped cuts in both tail ends. */
export const RIBBON_NOTCHES = "M16.87 148.7L29.42 146.47 33.02 158.7ZM86.98 158.7L90.58 146.47 103.13 148.7Z"
