"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/Logo/breastscan-logo.svg"
import { common } from "@/content/common"
import { site } from "@/content/site"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"

/** The Breastscan.health logo, linked home. Size it by height. */
export function Logo({ className }: { className?: string }) {
  const { t, href } = useI18n()
  return (
    <Link
      href={href("/")}
      className={cn("flex h-12 min-w-0 items-center rounded-lg", className)}
      aria-label={`${site.name} ${t(common.home)}`}
    >
      <Image src={logo} alt="" className="h-full w-auto max-w-full" />
    </Link>
  )
}
