"use client"

import Link from "next/link"
import { GuransMark } from "@/components/brand/gurans-mark"
import { common } from "@/content/common"
import { site } from "@/content/site"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  const { t, href } = useI18n()
  return (
    <Link
      href={href("/")}
      className={cn("group flex items-center gap-2.5 rounded-full", className)}
      aria-label={`${site.name} ${t(common.home)}`}
    >
      <GuransMark className="size-10 shrink-0 transition-transform duration-700 group-hover:rotate-72 motion-reduce:transition-none" />
      <span className="flex flex-col">
        <span className="font-display text-[1.45rem] leading-none font-semibold text-rose-deep">
          {site.name}
        </span>
        <span lang="ne" className="text-[0.8rem] leading-tight font-medium text-mauve">
          {site.nameNe}
        </span>
      </span>
    </Link>
  )
}
