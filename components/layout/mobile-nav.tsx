"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/brand/logo"
import { LanguageSwitch } from "@/components/layout/language-switch"
import { NavLinks } from "@/components/layout/nav-links"
import { common } from "@/content/common"
import { paths, site } from "@/content/site"
import { useI18n } from "@/i18n/client"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { t, href } = useI18n()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-lg" className="size-11 rounded-full lg:hidden" aria-label={t(common.openMenu)}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 rounded-l-[2rem] border-0 bg-paper">
        <SheetHeader>
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>
        <NavLinks
          onNavigate={close}
          className="flex flex-col gap-1 px-4"
          linkClassName="px-4 py-3 font-display text-2xl font-semibold"
        />
        <LanguageSwitch full className="mx-4 mt-4 self-start" />
        <div className="mt-auto space-y-3 p-4">
          <Button asChild size="xl" className="w-full">
            <Link href={href(paths.book)} onClick={close}>
              <Heart data-icon="inline-start" className="fill-current" />
              {t(common.book)}
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="w-full">
            <a href={`tel:${site.phone}`}>
              <Phone data-icon="inline-start" />
              {site.phone}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
