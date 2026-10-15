import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { LanguageSwitch } from "@/components/layout/language-switch"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks } from "@/components/layout/nav-links"
import { StickyHeader } from "@/components/layout/sticky-header"
import { common } from "@/content/common"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

export async function SiteHeader() {
  const { t, href } = await getI18n()
  return (
    <StickyHeader className="px-3 pt-3 sm:px-4">
      {/* At the top the bar sits a little lower and bare; once scrolled it lifts and the pill gathers around it. */}
      <div className="relative mx-auto flex h-16 max-w-7xl translate-y-2 items-center gap-2 pr-2 pl-4 transition-transform duration-700 ease-soft group-data-scrolled:translate-y-0 motion-reduce:transition-none sm:h-18 sm:gap-3 sm:pl-5">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-1.5 scale-x-[1.04] rounded-full bg-white/80 opacity-0 shadow-soft ring-1 ring-petal/70 backdrop-blur-md transition-[opacity,scale,translate] duration-700 ease-soft group-data-scrolled:translate-y-0 group-data-scrolled:scale-x-100 group-data-scrolled:opacity-100 motion-reduce:transition-none"
        />
        <Logo className="mr-auto h-11 sm:h-14" />
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
    </StickyHeader>
  )
}
