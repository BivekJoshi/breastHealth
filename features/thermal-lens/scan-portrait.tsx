"use client"

import { useCallback, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Heart } from "lucide-react"
import heroWoman from "@/assets/HeroWomen.png"
import { RibbonSeal } from "@/components/brand/pink-ribbon"
import { hero } from "@/content/home"
import { pinkOctober } from "@/content/pink-october"
import { paths } from "@/content/site"
import { intlLocale } from "@/i18n/config"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"
import { AMBIENT_C, CORE_C, heatLevel, temperatureAt } from "./heat"
import { SCAN, VIEW } from "./torso"
import { ThermalTorso } from "./torso-figure"

const pct = (n: number, of: number) => `${(n / of) * 100}%`
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/** Where the scan window sits on the photo, in its pixels: over her chest, under the neckline. */
const PHOTO_SCAN = { x: 310, y: 975, w: 440, h: 280 }

const SCAN_BOX = {
  left: pct(PHOTO_SCAN.x, heroWoman.width),
  top: pct(PHOTO_SCAN.y, heroWoman.height),
  width: pct(PHOTO_SCAN.w, heroWoman.width),
  height: pct(PHOTO_SCAN.h, heroWoman.height),
}
// The thermal view of the whole body, placed so the window shows just the chest.
const THERMAL_BOX = {
  left: pct(-SCAN.x, SCAN.w),
  top: pct(-SCAN.y, SCAN.h),
  width: pct(VIEW.w, SCAN.w),
  height: pct(VIEW.h, SCAN.h),
}

/**
 * The home hero's picture: the photo, with a small thermal scan card over
 * her chest, a sample result, and the pink ribbon seal for October. Pointing at the scan reads the temperature
 * there; nothing moves on its own.
 */
export function ScanPortrait({ className }: { className?: string }) {
  const { t, href } = useI18n()

  return (
    <div className={cn("relative", className)}>
      <div className="relative" style={{ aspectRatio: `${heroWoman.width} / ${heroWoman.height}` }}>
        <Image
          src={heroWoman}
          alt={t(hero.photoAlt)}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 28rem, 26rem"
          className="photo-fade object-cover"
        />

        <ScanCard />

        {/* the hazy top-left corner, opposite the sample result */}
        <RibbonSeal
          text={t(pinkOctober.seal)}
          repeat={t(pinkOctober.sealRepeat)}
          label={t(pinkOctober.statement)}
          className="absolute -top-[4%] -left-[3%] w-28 sm:-left-[8%] sm:w-32 lg:-left-[10%] xl:-left-[16%] xl:w-36"
        />

        <p
          aria-hidden
          className="absolute -right-[2%] -bottom-[11%] hidden -rotate-12 items-end gap-1 font-script text-[1.7rem] leading-none text-rose sm:flex xl:-right-[17%] xl:bottom-[5%] [&:lang(ne)]:text-lg"
        >
          {t(hero.note)}
          <Heart className="size-5 rotate-12 text-rose/70" />
        </p>
      </div>

      {/* a sample result: under the photo on phones, beside her face from sm */}
      <div className="relative mx-auto mt-10 w-full max-w-xs rounded-2xl bg-white p-4 shadow-lift ring-1 ring-petal/60 sm:absolute sm:top-[22%] sm:-right-[10%] sm:mt-0 sm:w-[12.5rem] xl:top-[20%] xl:-right-[16%] xl:w-[15rem]">
        <p className="text-[0.65rem] font-extrabold tracking-wider text-mauve uppercase">
          {t(hero.result.eyebrow)}
        </p>
        <div className="mt-2 flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600 sm:size-10">
            <Check className="size-5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm leading-snug font-bold text-berry sm:text-[0.95rem]">{t(hero.result.title)}</p>
            <p className="mt-0.5 text-xs text-mauve">{t(hero.result.text)}</p>
          </div>
        </div>
        <Link
          href={href(`${paths.screening}#pipeline`)}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-blush px-3 py-2 text-xs font-bold text-berry transition-colors hover:bg-petal"
        >
          {t(hero.result.link)}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}

/**
 * A small card over her chest: the thermal view, with its temperature scale
 * underneath. Point at the view to read the temperature there; the scale's
 * marker follows.
 */
function ScanCard() {
  const { locale, num } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const format = useMemo(
    () => new Intl.NumberFormat(intlLocale[locale], { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    [locale]
  )

  /** Moves the crosshair to (u, v), 0–1 across the view, and reads the temperature there. */
  const readAt = useCallback(
    (u: number, v: number) => {
      const el = ref.current
      if (!el) return
      const celsius = temperatureAt((SCAN.x + u * SCAN.w) / VIEW.w, (SCAN.y + v * SCAN.h) / VIEW.h)
      el.style.setProperty("--cx", `${u * 100}%`)
      el.style.setProperty("--cy", `${v * 100}%`)
      el.style.setProperty("--heat", heatLevel(celsius).toFixed(3))
      if (readout.current) readout.current.textContent = `${format.format(celsius)}°C`
    },
    [format]
  )

  useEffect(() => readAt(0.5, 0.5), [readAt])

  const onPoint = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ref.current?.setAttribute("data-reading", "")
    readAt(clamp01((e.clientX - r.left) / r.width), clamp01((e.clientY - r.top) / r.height))
  }
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    // a tap keeps its reading on screen
    if (e.pointerType === "touch") return
    ref.current?.removeAttribute("data-reading")
    readAt(0.5, 0.5)
  }

  return (
    <div ref={ref} aria-hidden className="group/scan absolute" style={SCAN_BOX}>
      <div className="absolute -inset-1.5 -bottom-10 rounded-[1.375rem] bg-white shadow-lift ring-1 ring-petal/50" />

      <div
        onPointerMove={onPoint}
        onPointerDown={onPoint}
        onPointerLeave={onLeave}
        className="absolute inset-0 cursor-crosshair overflow-hidden rounded-2xl bg-heat-0"
      >
        <ThermalTorso className="absolute max-w-none" style={THERMAL_BOX} />
        {["top-2 left-2 border-t-[1.5px] border-l-[1.5px]", "top-2 right-2 border-t-[1.5px] border-r-[1.5px]",
          "bottom-2 left-2 border-b-[1.5px] border-l-[1.5px]", "right-2 bottom-2 border-r-[1.5px] border-b-[1.5px]"].map((c) => (
          <span key={c} className={cn("absolute size-3 border-white/80", c)} />
        ))}
      </div>

      <div className="pointer-events-none absolute" style={{ left: "var(--cx, 50%)", top: "var(--cy, 50%)" }}>
        <span className="absolute h-px w-3.5 -translate-1/2 bg-white/90" />
        <span className="absolute h-3.5 w-px -translate-1/2 bg-white/90" />
        <span
          ref={readout}
          className="absolute -top-7 left-1.5 rounded-full bg-white px-2 py-0.5 text-[0.7rem] font-extrabold whitespace-nowrap text-berry tabular-nums opacity-0 shadow-sm transition-opacity group-data-reading/scan:opacity-100"
        />
      </div>

      <div className="absolute inset-x-1 -bottom-7.5 flex items-center gap-2 text-[0.65rem] font-bold text-mauve tabular-nums">
        <span>{num(AMBIENT_C)}°C</span>
        <span className="relative h-1.5 flex-1 rounded-full bg-linear-to-r from-heat-1 via-heat-2 to-heat-4">
          <span
            className="absolute top-1/2 size-3 -translate-1/2 rounded-full border-2 border-white bg-rose shadow-sm"
            style={{ left: "calc(var(--heat, 0.5) * 100%)" }}
          />
        </span>
        <span>{num(CORE_C)}°C</span>
      </div>
    </div>
  )
}
