import { PETAL_ANGLES, PETAL_PATH } from "@/components/brand/gurans"

/** The small gurans flower used in the logo and as a bullet. */
export function GuransMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      {PETAL_ANGLES.map((a, i) => (
        <path
          key={a}
          d={PETAL_PATH}
          transform={`rotate(${a})`}
          className={i % 2 ? "fill-[#f27aa5]" : "fill-rose"}
        />
      ))}
      <circle r="17" className="fill-heat-4" />
      <circle r="8" className="fill-rose-deep" />
    </svg>
  )
}
