"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays, Newspaper, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { newsCopy as copy } from "@/content/news"
import { paths } from "@/content/site"
import type { Bilingual } from "@/content/types"
import { intlLocale } from "@/i18n/config"
import { useI18n } from "@/i18n/client"
import { apiAsset, apiFetch } from "@/lib/api"

/* The shapes GET /api/news and GET /api/news/:slug return. */

type NewsSummary = {
  id: string
  title: Bilingual
  summary: Bilingual
  /** The cover photo's API path, for apiAsset(). */
  image: string | null
  /** YYYY-MM-DD */
  date: string
}

/** `images` is every photo, cover first. */
type NewsPost = NewsSummary & { images: string[]; body: Bilingual }

type Load<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "error"; missing: boolean }

/** Fetches once per path, with a retry. Posts are fetched in the browser, so new ones appear without a rebuild. */
function useApi<T>(path: string) {
  const [state, setState] = useState<Load<T>>({ status: "loading" })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    apiFetch<T>(path).then(
      (data) => !cancelled && setState({ status: "ready", data }),
      (error) => !cancelled && setState({ status: "error", missing: error?.status === 404 })
    )
    return () => {
      cancelled = true
    }
  }, [path, attempt])

  const retry = () => {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }

  return { ...state, retry }
}

function useFormatDate() {
  const { locale } = useI18n()
  return (day: string) =>
    new Date(`${day}T00:00:00Z`).toLocaleDateString(intlLocale[locale], { dateStyle: "long", timeZone: "UTC" })
}

/** The /news page: the list, or one post when ?post= is set. */
export function NewsFeed({ post }: { post?: string | null }) {
  return post ? <NewsArticle slug={post} /> : <NewsList />
}

function NewsList() {
  const { t, href } = useI18n()
  const formatDate = useFormatDate()
  const news = useApi<{ posts: NewsSummary[] }>("/news")

  if (news.status === "loading") return <Skeleton label={t(copy.loading)} />
  if (news.status === "error") return <Failed onRetry={news.retry} />
  if (news.data.posts.length === 0) return <Notice text={t(copy.empty)} />

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {news.data.posts.map((post) => {
        const link = `${href(paths.news)}?post=${post.id}`
        return (
          <li key={post.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-white shadow-soft">
              {post.image && (
                // An upload served by the API, size unknown — a plain img, not next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={apiAsset(post.image)} alt="" loading="lazy" className="aspect-video w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className="inline-flex items-center gap-1.5 text-sm font-bold text-mauve">
                  <CalendarDays className="size-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight font-semibold text-navy">
                  <Link href={link} className="hover:text-rose-deep">
                    {t(post.title)}
                  </Link>
                </h2>
                {t(post.summary) && <p className="mt-3 leading-relaxed text-mauve">{t(post.summary)}</p>}
                <div className="mt-auto pt-6">
                  <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
                    <Link href={link} aria-label={`${t(copy.readMore)}: ${t(post.title)}`}>
                      {t(copy.readMore)}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

function NewsArticle({ slug }: { slug: string }) {
  const { t, href, num } = useI18n()
  const formatDate = useFormatDate()
  const news = useApi<{ post: NewsPost }>(`/news/${encodeURIComponent(slug)}`)

  const back = (
    <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
      <Link href={href(paths.news)}>
        <ArrowLeft data-icon="inline-start" />
        {t(copy.back)}
      </Link>
    </Button>
  )

  if (news.status === "loading") return <Skeleton label={t(copy.loading)} />
  if (news.status === "error") {
    return news.missing ? (
      <Notice text={t(copy.missing)}>{back}</Notice>
    ) : (
      <Failed onRetry={news.retry} />
    )
  }

  const { post } = news.data
  const [cover, ...gallery] = post.images
  // Plain text from the admin: a blank line starts a new paragraph.
  const paragraphs = t(post.body)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article className="mx-auto max-w-3xl">
      {back}
      <p className="mt-8 flex items-center gap-1.5 text-sm font-bold text-mauve">
        <CalendarDays className="size-4" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight font-semibold text-balance text-navy">
        {t(post.title)}
      </h2>
      {t(post.summary) && <p className="mt-4 text-xl leading-relaxed text-mauve">{t(post.summary)}</p>}
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={apiAsset(cover)} alt="" className="mt-8 w-full rounded-[2rem] object-cover shadow-soft" />
      )}
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-berry">
        {paragraphs.map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>
      {gallery.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <li key={src}>
              {/* Opens the full photo in a new tab. */}
              <a
                href={apiAsset(src)}
                target="_blank"
                rel="noopener"
                className="block overflow-hidden rounded-2xl shadow-soft transition-transform hover:scale-[1.02]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={apiAsset(src)}
                  alt={`${t(copy.photo)} ${num(i + 2)} — ${t(post.title)}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

function Skeleton({ label }: { label: string }) {
  return (
    <div role="status" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden className="h-72 animate-pulse rounded-[2.25rem] bg-white shadow-soft" />
      ))}
    </div>
  )
}

function Failed({ onRetry }: { onRetry: () => void }) {
  const { t } = useI18n()
  return (
    <Notice text={t(copy.failed)}>
      <Button variant="outline" size="lg" className="h-11 rounded-full px-5" onClick={onRetry}>
        <RotateCw data-icon="inline-start" />
        {t(copy.retry)}
      </Button>
    </Notice>
  )
}

function Notice({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[2.25rem] bg-white p-10 text-center shadow-soft">
      <span className="grid size-14 place-items-center rounded-full bg-blush text-rose">
        <Newspaper className="size-6" />
      </span>
      <p className="font-display text-2xl font-semibold text-navy">{text}</p>
      {children}
    </div>
  )
}
