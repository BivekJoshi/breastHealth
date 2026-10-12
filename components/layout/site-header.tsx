import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { LanguageSwitch } from "@/components/layout/language-switch"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks } from "@/components/layout/nav-links"
import { common } from "@/content/common"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

export async function SiteHeader() {
  const { t, href } = await getI18n()
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 rounded-full bg-white/80 pr-2 pl-4 shadow-soft ring-1 ring-petal/70 backdrop-blur-md sm:h-18 sm:gap-3 sm:pl-5">
        <Logo className="mr-auto" />
        <NavLinks className="hidden items-center gap-1 lg:flex" linkClassName="px-4 py-2 text-[0.95rem] font-bold" />
        <LanguageSwitch />
        <Button asChild size="lg" className="hidden h-11 rounded-full px-5 sm:inline-flex">
          <Link href={href(paths.book)}>
            <Heart data-icon="inline-start" className="fill-current" />
            {t(common.book)}
          </Link>
        </Button>
        <MobileNav />
      </div>
    </header>
  )
}
