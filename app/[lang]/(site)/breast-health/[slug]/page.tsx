import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CircleAlert } from "lucide-react"
import { BookCta } from "@/components/common/book-cta"
import { JsonLd } from "@/components/common/json-ld"
import { PageIntro } from "@/components/common/page-intro"
import { articlePath, articles, guideCopy } from "@/content/guide"
import { pageUrl, paths, site } from "@/content/site"
import { localizedMetadata } from "@/i18n/metadata"
import { getI18n } from "@/i18n/server"
import { ArticleCard } from "@/sections/guide/article-card"

// Only the articles in content/guide.ts exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

async function findArticle(params: PageProps<"/[lang]/breast-health/[slug]">["params"]) {
  const { slug } = await params
  const index = articles.findIndex((a) => a.slug === slug)
  if (index === -1) notFound()
  return { article: articles[index], index }
}

export async function generateMetadata({ params }: PageProps<"/[lang]/breast-health/[slug]">) {
  const { article } = await findArticle(params)
  return localizedMetadata(articlePath(article.slug), article)
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/breast-health/[slug]">) {
  const { article, index } = await findArticle(params)
  const { t, num, href, locale } = await getI18n()

  const url = pageUrl(href(articlePath(article.slug)))
  const updated = new Date(article.updated)
  const updatedText = t(guideCopy.updated)(
    num(updated.getUTCDate()),
    t(guideCopy.months)[updated.getUTCMonth()],
    num(updated.getUTCFullYear())
  )
  // The next three articles, wrapping round, so every article is linked from three others.
  const related = [1, 2, 3].map((k) => articles[(index + k) % articles.length])

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalWebPage",
              "@id": url,
              url,
              name: t(article.title),
              headline: t(article.title),
              description: t(article.description),
              inLanguage: locale,
              dateModified: article.updated,
              isPartOf: { "@id": `${site.url}/#website` },
              publisher: { "@id": `${site.url}/#organization` },
              ...(article.reviewedBy && {
                reviewedBy: { "@type": "Person", name: t(article.reviewedBy) },
                lastReviewed: article.updated,
              }),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { name: t(guideCopy.home), item: pageUrl(href("/")) },
                { name: t(guideCopy.back), item: pageUrl(href(paths.guide)) },
                { name: t(article.short), item: url },
              ].map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })),
            },
          ],
        }}
      />

      <PageIntro copy={{ title: article.title, lead: article.lead }} />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <article className="max-w-3xl">
          <Link
            href={href(paths.guide)}
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-deep hover:text-rose"
          >
            <ArrowLeft className="size-4" />
            {t(guideCopy.back)}
          </Link>

          {article.sections.map((s) => (
            <section key={s.heading.en} className="mt-12 first-of-type:mt-8">
              <h2 className="font-display text-3xl leading-tight font-semibold text-navy">{t(s.heading)}</h2>
              {s.text?.map((p) => (
                <p key={p.en} className="mt-4 text-lg leading-relaxed text-pretty">
                  {t(p)}
                </p>
              ))}
              {s.list && s.ordered && (
                <ol className="mt-6 space-y-5">
                  {s.list.map((item, i) => (
                    <li key={item.en} className="flex gap-4 text-lg leading-relaxed">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blush font-display font-semibold text-rose-deep">
                        {num(i + 1)}
                      </span>
                      <span className="pt-1">{t(item)}</span>
                    </li>
                  ))}
                </ol>
              )}
              {s.list && !s.ordered && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((item) => (
                    <li key={item.en} className="flex gap-4 text-lg leading-relaxed">
                      <span aria-hidden className="mt-2.5 block size-2.5 shrink-0 rounded-full bg-rose ring-4 ring-blush" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-14 space-y-1 border-t border-petal pt-6 text-sm text-mauve">
            {article.reviewedBy && (
              <p className="font-bold text-berry">{t(guideCopy.reviewedBy)(t(article.reviewedBy))}</p>
            )}
            <p>
              <time dateTime={article.updated}>{updatedText}</time>
            </p>
            <p>{t(guideCopy.disclaimer)}</p>
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="on-rose rounded-[2.25rem] bg-linear-to-br from-rose to-[#e0508a] p-8 text-white shadow-lift">
            <h2 className="flex items-center gap-3 font-display text-2xl leading-snug font-semibold">
              <CircleAlert className="size-6 shrink-0" strokeWidth={2.2} />
              {t(article.seeADoctorTitle ?? guideCopy.seeADoctor)}
            </h2>
            <ul className="mt-5 space-y-3">
              {article.seeADoctor.map((sign) => (
                <li key={sign.en} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2 block size-2 shrink-0 rounded-full bg-white" />
                  {t(sign)}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section aria-labelledby="related" className="mx-auto max-w-7xl px-5">
        <h2 id="related" className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold text-navy">
          {t(guideCopy.related)}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((a) => (
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
