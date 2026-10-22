import { BookCta } from "@/components/common/book-cta"
import { PageIntro } from "@/components/common/page-intro"
import { articles, guidePage } from "@/content/guide"
import { paths } from "@/content/site"
import { localizedMetadata } from "@/i18n/metadata"
import { ArticleCard } from "@/sections/guide/article-card"

export async function generateMetadata() {
  return localizedMetadata(paths.guide, guidePage.meta)
}

export default function GuidePage() {
  return (
    <>
      <PageIntro copy={guidePage.intro} />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>

      <BookCta />
    </>
  )
}
