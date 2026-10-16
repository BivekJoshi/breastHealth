/**
 * Base URL of the BreastScan API (BreastScanBackend).
 *
 * Inlined at build time like every NEXT_PUBLIC_ variable, so set it before
 * `next build` when the API lives on another origin, e.g.
 *   NEXT_PUBLIC_API_URL=https://api.breastscan.com.np/api
 * Without it (or with it empty, as an unset CI variable arrives), `next dev`
 * talks to the backend's default port and a static build expects the API on
 * the same origin under /api.
 */
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:4000/api" : "/api")
).replace(/\/+$/, "")

/** A file the API serves, from the path it returned (e.g. a news photo's "/news/images/<key>"). */
export const apiAsset = (path: string) => `${API_URL}${path}`

/** What the API sends back on failure: a message, plus per-field messages for forms. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fields: Record<string, string> = {}
  ) {
    super(message)
  }
}

type Options = Omit<RequestInit, "body"> & { body?: unknown; token?: string | null }

/**
 * JSON in, JSON out — or a Blob in, sent as the raw bytes (a photo upload).
 * Throws ApiError with the server's { error, details }.
 */
export async function apiFetch<T>(path: string, { body, token, headers, ...init }: Options = {}): Promise<T> {
  const file = body instanceof Blob ? body : null
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(body !== undefined && { "Content-Type": file ? file.type || "application/octet-stream" : "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: body === undefined ? undefined : file ?? JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, "Cannot reach the server. Is the API running?")
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error ?? "Something went wrong. Please try again.",
      data.details ?? {}
    )
  }
  return data as T
}
