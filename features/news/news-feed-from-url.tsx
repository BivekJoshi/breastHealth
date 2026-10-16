"use client"

import { useSearchParams } from "next/navigation"
import { NewsFeed } from "./news-feed"

/** Reads ?post=<slug>, so a single post has a link of its own. */
export function NewsFeedFromUrl() {
  const post = useSearchParams().get("post")
  return <NewsFeed key={post ?? "list"} post={post} />
}
