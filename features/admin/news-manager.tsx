"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, ExternalLink, Images, Newspaper, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { paths } from "@/content/site"
import { useI18n } from "@/i18n/client"
import { apiAsset } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { AdminNews, AdminNewsPost, AdminRequest } from "./admin-api"
import { NewsEditor } from "./editors"
import { formatDay } from "./format"
import { EmptyRow, LoadState, NoticeBanner, RowActions, badge, card, useRowActions } from "./list-ui"

export function NewsManager({ request }: { request: AdminRequest }) {
  const { href } = useI18n()
  const [data, setData] = useState<AdminNews | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  // undefined: closed; null: a new post.
  const [editing, setEditing] = useState<AdminNewsPost | null | undefined>(undefined)

  const reload = useCallback(
    () =>
      request<AdminNews>("/admin/news").then(
        (next) => {
          setData(next)
          setLoadError(null)
        },
        (error: Error) => setLoadError(error.message)
      ),
    [request]
  )

  useEffect(() => {
    reload()
  }, [reload])

  const { notice, setNotice, busyId, act } = useRowActions(reload)

  const saved = (text: string) => {
    setEditing(undefined)
    setNotice({ tone: "success", text })
    reload()
  }

  const togglePost = (post: AdminNewsPost) =>
    act(
      `news-${post.id}`,
      () => request(`/admin/news/${post.id}`, { method: "PATCH", body: { isActive: !post.is_active } }),
      `“${post.title_en}” is now ${post.is_active ? "hidden" : "visible"}.`
    )

  const deletePost = (post: AdminNewsPost) => {
    if (!window.confirm(`Delete “${post.title_en}”? This cannot be undone.`)) return
    act(`news-${post.id}`, () => request(`/admin/news/${post.id}`, { method: "DELETE" }), `Deleted “${post.title_en}”.`)
  }

  if (!data) return <LoadState error={loadError} what="news" onRetry={reload} />

  const isLive = (post: AdminNewsPost) => post.is_active && post.published_at <= data.today
  const live = data.posts.filter(isLive).length

  return (
    <div className="space-y-8">
      <p className="text-lg text-mauve">
        <strong className="text-berry">{live}</strong> of {data.posts.length} {data.posts.length === 1 ? "post" : "posts"}{" "}
        live on the website.
      </p>

      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />

      <section aria-labelledby="news" className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="news" className="font-display text-2xl font-semibold text-navy">
              News posts
            </h2>
            <p className="text-mauve">Newest first, as on the website’s News page.</p>
          </div>
          <Button size="lg" className="h-11 rounded-full px-5" onClick={() => setEditing(null)}>
            <Plus data-icon="inline-start" />
            Add post
          </Button>
        </div>

        {data.posts.length === 0 ? (
          <EmptyRow icon={Newspaper} text="No news yet. Add the first post — it appears on the website straight away." />
        ) : (
          <ul className="mt-6 divide-y divide-border">
            {data.posts.map((post) => {
              const scheduled = post.is_active && post.published_at > data.today
              return (
                <li key={post.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
                  <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-blush">
                    {post.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={apiAsset(post.images[0].url)} alt="" className="size-full object-cover" />
                    ) : (
                      <Newspaper className="size-5 text-rose" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 basis-56">
                    <p className="flex flex-wrap items-center gap-2 font-bold text-berry">
                      {post.title_en}
                      {scheduled && <span className={cn(badge, "bg-lilac text-lilac-deep")}>Scheduled</span>}
                      {!post.title_ne && <span className={cn(badge, "bg-paper text-mauve ring-1 ring-border")}>No Nepali</span>}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-4 text-sm text-mauve">
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <CalendarDays className="size-3.5" />
                        {formatDay(post.published_at)}
                      </span>
                      {post.images.length > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Images className="size-3.5" />
                          {post.images.length} {post.images.length === 1 ? "photo" : "photos"}
                        </span>
                      )}
                      {isLive(post) && (
                        <Link
                          href={`${href(paths.news)}?post=${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-rose-deep hover:underline"
                        >
                          <ExternalLink className="size-3.5" />
                          View on site
                        </Link>
                      )}
                    </p>
                  </div>
                  <RowActions
                    active={post.is_active}
                    busy={busyId === `news-${post.id}`}
                    name={post.title_en}
                    onToggle={() => togglePost(post)}
                    onEdit={() => setEditing(post)}
                    onDelete={() => deletePost(post)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Sheet open={editing !== undefined} onOpenChange={(open) => !open && setEditing(undefined)}>
        <SheetContent className="w-full! overflow-y-auto bg-white sm:max-w-xl!">
          {editing !== undefined && (
            <NewsEditor key={editing?.id ?? "new"} post={editing} today={data.today} request={request} onSaved={saved} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
