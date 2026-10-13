import { RibbonGlyph } from "@/components/brand/pink-ribbon"
import type { Title } from "@/content/types"
import { cn } from "@/lib/utils"

/** Four-point sparkle. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
      <path d="M12 0C12.9 6.6 17.4 11.1 24 12 17.4 12.9 12.9 17.4 12 24 11.1 17.4 6.6 12.9 0 12 6.6 11.1 11.1 6.6 12 0Z" />
    </svg>
  )
}

/** A single loose petal. */
export function Petal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true" className={cn("fill-current", className)}>
      <path d="M12 1C20 7 21.5 20 12 31 2.5 20 4 7 12 1Z" />
    </svg>
  )
}

const shapes = { petal: Petal, sparkle: Sparkle, ribbon: RibbonGlyph }

type Floater = {
  kind: keyof typeof shapes
  className: string
  tilt?: number
  delay?: number
}

/**
 * Petals, sparkles and ribbons that drift gently. Purely decorative; motion is
 * skipped for people who prefer reduced motion.
 */
export function Floaters({ items }: { items: Floater[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((f, i) => {
        const Shape = shapes[f.kind]
        return (
          <span
            key={i}
            className={cn(
              "absolute block",
              f.kind === "sparkle" ? "motion-safe:animate-twinkle" : "motion-safe:animate-float",
              f.className
            )}
            style={
              {
                "--tilt": `${f.tilt ?? 0}deg`,
                transform: `rotate(${f.tilt ?? 0}deg)`,
                animationDelay: `${f.delay ?? 0}s`,
              } as React.CSSProperties
            }
          >
            <Shape className="size-full" />
          </span>
        )
      })}
    </div>
  )
}

/** Soft wavy edge for the top or bottom of a section. Inherits text colour. */
export function WaveEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-8 w-full fill-current sm:h-12", flip && "rotate-180", className)}
    >
      <path d="M0 30C180 62 360 62 540 34S900 -2 1080 20 1350 52 1440 40V60H0Z" />
    </svg>
  )
}

/** A word in the handwritten accent face. */
export function Script({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-script font-bold tracking-normal text-rose", className)}>{children}</span>
  )
}

/** Renders a title, setting its accent word (if any) in the handwritten face. */
export function AccentTitle({ title, accentClassName }: { title: Title; accentClassName?: string }) {
  if (typeof title === "string") return <>{title}</>
  return (
    <>
      {title.before}
      <Script className={cn("text-[1.15em]", accentClassName)}>{title.accent}</Script>
      {title.after}
    </>
  )
}
