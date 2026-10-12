// Geometry for the gurans (rhododendron) flower, drawn in a
// viewBox centred on 0,0 with petals reaching radius 92.

export const PETAL_ANGLES = [-8, 64, 136, 208, 280]

export const PETAL_PATH = "M0 0 C -54 -20, -64 -80, 0 -92 C 64 -80, 54 -20, 0 0 Z"

/** Long curved stamens — the rhododendron's most recognisable detail. */
export const STAMENS = [
  { angle: -40, length: 58 },
  { angle: -14, length: 66 },
  { angle: 10, length: 60 },
  { angle: 34, length: 54 },
  { angle: 58, length: 47 },
  { angle: -62, length: 48 },
].map(({ angle, length }) => {
  const rad = ((angle - 90) * Math.PI) / 180
  const x = +(Math.cos(rad) * length).toFixed(2)
  const y = +(Math.sin(rad) * length).toFixed(2)
  // bow each stamen slightly clockwise
  const cx = +(Math.cos(rad + 0.35) * length * 0.55).toFixed(2)
  const cy = +(Math.sin(rad + 0.35) * length * 0.55).toFixed(2)
  return { d: `M0 0 Q ${cx} ${cy} ${x} ${y}`, x, y }
})
