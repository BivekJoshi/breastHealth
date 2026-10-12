"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { common } from "@/content/common"
import { nav } from "@/content/site"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"

export function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: {
  className?: string
  linkClassName?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const { t, href } = useI18n()

  return (
    <nav aria-label={t(common.mainNav)} className={className}>
      {nav.map((item) => {
        const target = href(item.path)
        const active = !target.includes("#") && pathname === target
        return (
          <Link
            key={item.path}
            href={target}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full text-berry transition-colors hover:bg-blush hover:text-rose-deep aria-[current=page]:bg-blush aria-[current=page]:text-rose-deep",
              linkClassName
            )}
          >
            {t(item.label)}
          </Link>
        )
      })}
    </nav>
  )
}
