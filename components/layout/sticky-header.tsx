"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** A sticky <header> that sets data-scrolled once the page leaves the top, so the bar can blend in until then. */
export function StickyHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header data-scrolled={scrolled || undefined} className={cn("group sticky top-0 z-40", className)}>
      {children}
    </header>
  )
}
