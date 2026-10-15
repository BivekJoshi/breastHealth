import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { PinkRibbon } from "@/components/brand/pink-ribbon"
import { WaveEdge } from "@/components/brand/doodles"
import { common } from "@/content/common"
import { pinkOctober } from "@/content/pink-october"
import { nav, paths, site } from "@/content/site"
import { getI18n } from "@/i18n/server"

export async function SiteFooter() {
  const { t, num, href } = await getI18n()
  const contact = [
    { icon: MapPin, value: t(site.address) },
    { icon: Clock, value: t(site.hours) },
    { icon: Phone, value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, value: site.email, href: `mailto:${site.email}` },
  ]
  const links = [...nav, { label: common.book, path: paths.book }]

  return (
    <footer className="mt-auto text-berry">
      <WaveEdge className="text-blush" />
      <div className="bg-blush">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-10 pb-14 md:grid-cols-[1.3fr_1fr_0.8fr]">
          <div className="max-w-sm space-y-4">
            <Logo className="h-20" />
            <p className="leading-relaxed text-mauve">{t(site.description)}</p>
            <p className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-2.5 text-sm font-bold text-rose-deep shadow-sm">
              <PinkRibbon animated={false} className="h-6 w-auto shrink-0" />
              {t(pinkOctober.statement)}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy">{t(common.footer.visit)}</h2>
            <ul className="mt-4 space-y-3">
              {contact.map(({ icon: Icon, value, href: link }) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-rose shadow-sm">
                    <Icon className="size-4" />
                  </span>
                  {link ? (
                    <a href={link} className="pt-1 break-all hover:text-rose-deep">
                      {value}
                    </a>
                  ) : (
                    <span className="pt-1">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy">{t(common.footer.pages)}</h2>
            <ul className="mt-4 space-y-2.5">
              {links.map((item) => (
                <li key={item.path}>
                  <Link href={href(item.path)} className="font-semibold hover:text-rose-deep">
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-petal">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-mauve sm:flex-row sm:justify-between">
            <p>
              © {num(2026)} {site.name} · {t(common.footer.madeIn)}
            </p>
            <p>{t(common.footer.disclaimer)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
