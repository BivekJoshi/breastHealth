import Link from "next/link"
import { ArrowRight, CircleDot, Eye, Hand, HeartPulse, ScanHeart, ShieldCheck } from "lucide-react"
import { articlePath, guideCopy, type GuideArticle } from "@/content/guide"
import { getI18n } from "@/i18n/server"
import { cn } from "@/lib/utils"

const look: Record<string, { icon: typeof Eye; tile: string }> = {
  "breast-cancer-symptoms": { icon: Eye, tile: "bg-blush text-rose" },
  "breast-lump": { icon: CircleDot, tile: "bg-lilac text-lilac-deep" },
  "breast-self-exam": { icon: Hand, tile: "bg-peach text-[#c4532a]" },
  "breast-pain": { icon: HeartPulse, tile: "bg-blush text-rose" },
  "breast-cancer-risk": { icon: ShieldCheck, tile: "bg-lilac text-lilac-deep" },
  "breast-cancer-screening": { icon: ScanHeart, tile: "bg-peach text-[#c4532a]" },
}

/** A guide article as a card: icon, question, summary, link. */
export async function ArticleCard({ article }: { article: GuideArticle }) {
  const { t, href } = await getI18n()
  const { icon: Icon, tile } = look[article.slug] ?? look["breast-cancer-symptoms"]

  return (
    <Link
      href={href(articlePath(article.slug))}
      className="group flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-petal/50 transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift"
    >
      <span
        className={cn(
          "grid size-12 place-items-center rounded-2xl transition-transform duration-300 ease-soft group-hover:rotate-[-8deg]",
          tile
        )}
      >
        <Icon className="size-5" strokeWidth={2.2} />
      </span>
      <h3 className="mt-5 font-display text-2xl leading-snug font-semibold text-navy">{t(article.title)}</h3>
      <p className="mt-2 leading-relaxed text-mauve">{t(article.description)}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-rose-deep">
        {t(guideCopy.read)}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
