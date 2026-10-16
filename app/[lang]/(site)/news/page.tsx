import { Suspense } from "react"
import { PageIntro } from "@/components/common/page-intro"
import { newsPage } from "@/content/news"
import { paths } from "@/content/site"
import { NewsFeed } from "@/features/news/news-feed"
import { NewsFeedFromUrl } from "@/features/news/news-feed-from-url"
import { localizedMetadata } from "@/i18n/metadata"

export async function generateMetadata() {
  return localizedMetadata(paths.news, newsPage.meta)
}

export default function NewsPage() {
  return (
    <>
      <PageIntro copy={newsPage.intro} />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        {/* The fallback is the full list, so the static page shows the news without ?post=. */}
        <Suspense fallback={<NewsFeed />}>
          <NewsFeedFromUrl />
        </Suspense>
      </section>
    </>
  )
}
