import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Petal } from "@/components/brand/doodles"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { common } from "@/content/common"
import { paths } from "@/content/site"
import { getI18n } from "@/i18n/server"

export default async function NotFound() {
  const { t, num, href } = await getI18n()
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <Petal className="size-12 rotate-12 text-petal" />
        <p className="mt-6 rounded-full bg-blush px-4 py-1.5 text-sm font-extrabold text-rose-deep">{num(404)}</p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05] font-semibold text-balance">
          {t(common.notFound.title)}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-mauve">{t(common.notFound.text)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="xl">
            <Link href={href(paths.home)}>{t(common.notFound.home)}</Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href={href(paths.book)}>
              <Heart data-icon="inline-start" />
              {t(common.book)}
            </Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
