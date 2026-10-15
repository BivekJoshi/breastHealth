"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { common } from "@/content/common"
import { LOCALE_COOKIE, localeNames, locales } from "@/i18n/config"
import { useI18n } from "@/i18n/client"
import { switchLocalePath } from "@/i18n/i18n"
import { cn } from "@/lib/utils"

/** English / नेपाली toggle. Keeps the current page and remembers the choice. */
export function LanguageSwitch({ full = false, className }: { full?: boolean; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale, t } = useI18n()

  return (
    <nav
      aria-label={t(common.language)}
      className={cn("flex shrink-0 items-center rounded-full bg-blush p-1 ring-1 ring-petal", className)}
    >
      {locales.map((l) => {
        const target = switchLocalePath(pathname, l)
        const name = localeNames[l]
        return (
          <Link
            key={l}
            href={target}
            hrefLang={l}
            lang={l}
            aria-label={name.full}
            aria-current={l === locale ? "true" : undefined}
            onClick={(e) => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
              // keep filters such as ?city=pokhara when switching
              if (window.location.search) {
                e.preventDefault()
                router.push(target + window.location.search)
              }
            }}
            className="rounded-full px-3 py-1.5 text-sm leading-none font-extrabold text-navy transition-colors hover:text-rose-deep aria-[current=true]:bg-rose aria-[current=true]:text-white aria-[current=true]:shadow-soft"
          >
            {full ? (
              name.full
            ) : (
              <>
                <span className="lg:hidden">{name.short}</span>
                <span className="hidden lg:inline">{name.full}</span>
              </>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
