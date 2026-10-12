"use client"

import { useEffect, useRef, type RefObject } from "react"
import { intlLocale, type Locale } from "@/i18n/config"
import { AMBIENT_C, heatLevel, temperatureAt } from "./heat"

type Point = { x: number; y: number }

type LensOptions = {
  /** Index of the [data-lens-stop] the lens rests on when the pointer isn't over the root. */
  active: number
  /** Asks for a different stop: the one the pointer brings the lens over. */
  onStop: (index: number) => void
}

/**
 * Drives the thermal lens inside `rootRef`:
 * - follows the pointer over the root; otherwise rests on the active [data-lens-stop]
 * - writes --x/--y on the root
 * - writes the temperature under the lens, in the locale's digits, into [data-heat-readout],
 *   and its 0–1 level into --heat
 *
 * Everything is written straight to CSS variables (no React state per frame), and
 * frames run only while the lens or its reading is still settling.
 */
export function useThermalLens(
  rootRef: RefObject<HTMLElement | null>,
  locale: Locale,
  options: LensOptions
) {
  const latest = useRef(options)
  const wake = useRef(() => {})
  const format = useRef<Intl.NumberFormat>(null)

  useEffect(() => {
    latest.current = options
    wake.current()
  })

  useEffect(() => {
    format.current = new Intl.NumberFormat(intlLocale[locale], {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
    wake.current()
  }, [locale])

  useEffect(() => {
    const root = rootRef.current
    const source = root?.querySelector<SVGElement>("[data-heat-source]")
    if (!root || !source) return

    const readouts = Array.from(root.querySelectorAll<HTMLElement>("[data-heat-readout]"))
    const stopEls = Array.from(root.querySelectorAll<HTMLElement>("[data-lens-stop]"))
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let box = { x: 0, y: 0, w: 1, h: 1 }
    let bounds = { w: 0, h: 0, lens: 0 }
    let stops: Point[] = []

    const measure = () => {
      const r = root.getBoundingClientRect()
      const s = source.getBoundingClientRect()
      box = { x: s.left - r.left, y: s.top - r.top, w: s.width, h: s.height }
      // mirrors --lens-size: clamp(56px, 17cqi, 104px)
      bounds = { w: r.width, h: r.height, lens: Math.min(Math.max(56, r.width * 0.17), 104) }
      stops = stopEls.map((el) => {
        const b = el.getBoundingClientRect()
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 }
      })
    }

    // Keeps the resting lens, and the reading pill at its lower right, inside the root.
    const keepInside = ({ x, y }: Point): Point => {
      const r = bounds.lens
      return {
        x: Math.min(Math.max(x, r * 0.5), bounds.w - r * 0.68 - 88),
        y: Math.min(Math.max(y, r * 0.5), bounds.h - r * 0.68 - 34),
      }
    }

    const restingSpot = (): Point =>
      keepInside(stops[latest.current.active] ?? { x: box.x + box.w / 2, y: box.y + box.h / 2 })

    /** The stop under the lens, if any. */
    const stopUnder = ({ x, y }: Point) => {
      const reach = (bounds.lens * 0.6) ** 2
      let best = -1
      let bestDistance = reach
      stops.forEach((s, i) => {
        const d = (s.x - x) ** 2 + (s.y - y) ** 2
        if (d < bestDistance) [best, bestDistance] = [i, d]
      })
      return best
    }

    measure()
    const lens = restingSpot()
    let pointer: Point | null = null
    let shown = AMBIENT_C
    let visible = true
    let frame = 0
    let releaseTimer = 0
    let asked = -1

    const tick = () => {
      frame = 0
      const still = motion.matches
      const { active, onStop } = latest.current

      const goal = pointer ?? restingSpot()
      if (pointer) {
        const under = stopUnder(lens)
        if (under >= 0 && under !== active && under !== asked) {
          asked = under
          onStop(under)
        }
      } else {
        asked = -1
      }

      const ease = still ? 1 : pointer ? 0.25 : 0.14
      lens.x += (goal.x - lens.x) * ease
      lens.y += (goal.y - lens.y) * ease

      const actual = temperatureAt((lens.x - box.x) / box.w, (lens.y - box.y) / box.h)
      shown = still ? actual : shown + (actual - shown) * 0.15

      root.style.setProperty("--x", `${lens.x.toFixed(1)}px`)
      root.style.setProperty("--y", `${lens.y.toFixed(1)}px`)
      root.style.setProperty("--heat", heatLevel(shown).toFixed(3))
      const label = `${format.current?.format(shown) ?? shown.toFixed(1)}°C`
      for (const r of readouts) if (r.textContent !== label) r.textContent = label

      const settling =
        Math.abs(goal.x - lens.x) + Math.abs(goal.y - lens.y) > 0.3 || Math.abs(actual - shown) > 0.02
      if (settling) schedule()
    }

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick)
    }
    wake.current = schedule

    const onPointer = (e: PointerEvent) => {
      window.clearTimeout(releaseTimer)
      const r = root.getBoundingClientRect()
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top }
      schedule()
    }
    const onLeave = (e: PointerEvent) => {
      // A tap leaves immediately; hold the lens there for a moment first.
      const release = () => {
        pointer = null
        schedule()
      }
      if (e.pointerType === "touch") releaseTimer = window.setTimeout(release, 2500)
      else release()
    }

    root.addEventListener("pointermove", onPointer)
    root.addEventListener("pointerdown", onPointer)
    root.addEventListener("pointerleave", onLeave)

    const resize = new ResizeObserver(() => {
      measure()
      schedule()
    })
    resize.observe(root)
    document.fonts?.ready.then(measure)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })
    io.observe(root)

    motion.addEventListener("change", schedule)
    root.setAttribute("data-live", "")
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(releaseTimer)
      wake.current = () => {}
      root.removeEventListener("pointermove", onPointer)
      root.removeEventListener("pointerdown", onPointer)
      root.removeEventListener("pointerleave", onLeave)
      motion.removeEventListener("change", schedule)
      resize.disconnect()
      io.disconnect()
      root.removeAttribute("data-live")
    }
  }, [rootRef])
}
