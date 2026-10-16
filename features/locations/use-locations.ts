"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import { createDirectory, type Directory, type LocationsData } from "./directory"

/*
 * The centre list comes from the API at runtime, not from the static build, so
 * a centre added in the admin shows up on the next page load without a
 * redeploy.
 *
 * One request per page load, shared: the finder, the home-page teaser and the
 * booking form all call this hook, and the cached result also makes client-side
 * navigation between them instant.
 */

let cached: Directory | null = null
let request: Promise<Directory> | null = null

function load() {
  request ??= apiFetch<LocationsData>("/locations")
    .then((data) => (cached = createDirectory(data)))
    .catch((error) => {
      request = null // let the next attempt try again
      throw error
    })
  return request
}

export type LocationsState =
  | { status: "loading" }
  | { status: "ready"; directory: Directory }
  | { status: "error" }

export function useLocations() {
  // The server prerender always starts at "loading"; `cached` is only ever set in the browser.
  const [state, setState] = useState<LocationsState>(() =>
    cached ? { status: "ready", directory: cached } : { status: "loading" }
  )
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    load().then(
      (directory) => !cancelled && setState({ status: "ready", directory }),
      () => !cancelled && setState({ status: "error" })
    )
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = () => {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }

  return { ...state, retry }
}
