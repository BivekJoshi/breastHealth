import type { CentreType, Province } from "@/features/locations/directory"

/* The shapes the admin endpoints return: database ids and raw snake_case columns. */

export type AdminUser = { id: number; name: string; email: string; last_login_at: string | null }

export type AdminCity = {
  id: number
  slug: string
  name_en: string
  name_ne: string
  province: string
  sort_order: number
  is_active: boolean
  centre_count: number
}

export type AdminCentre = {
  id: number
  slug: string
  city_id: number
  name_en: string
  name_ne: string
  address_en: string
  address_ne: string
  phone: string
  type: string
  sort_order: number
  is_active: boolean
}

export type AdminLocations = {
  provinces: Province[]
  types: CentreType[]
  cities: AdminCity[]
  centres: AdminCentre[]
}

export type AppointmentStatus = "new" | "confirmed" | "completed" | "cancelled"

export type AdminAppointment = {
  id: number
  name: string
  phone: string
  age: number | null
  /** YYYY-MM-DD, or null when the visitor left it open. */
  preferred_date: string | null
  at_home: boolean
  centre_id: number | null
  /** The centre's name when the request came in. */
  centre_name: string
  message: string
  locale: "en" | "ne"
  status: AppointmentStatus
  admin_note: string
  created_at: string
}

export type AdminAppointments = {
  statuses: { id: AppointmentStatus; en: string }[]
  appointments: AdminAppointment[]
  counts: Record<AppointmentStatus | "all", number>
  total: number
  page: number
  pageSize: number
}

export type AdminNewsPost = {
  id: number
  slug: string
  title_en: string
  title_ne: string
  summary_en: string
  summary_ne: string
  body_en: string
  body_ne: string
  image_url: string
  /** YYYY-MM-DD. A future date keeps the post off the site until then. */
  published_at: string
  is_active: boolean
}

export type AdminNews = { posts: AdminNewsPost[]; today: string }

/** A request already carrying the session; signs out on a 401. */
export type AdminRequest = <T>(
  path: string,
  options?: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown }
) => Promise<T>

/*
 * The session token, kept in localStorage and read through
 * useSyncExternalStore so the page re-renders on sign-in and sign-out — in
 * this tab, and in any other tab via the storage event.
 */

const TOKEN_KEY = "breastscan_admin_token"
const listeners = new Set<() => void>()

const notify = () => listeners.forEach((listener) => listener())

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null // storage blocked: the session lasts until the tab closes
    }
  },
  set(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {}
    notify()
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {}
    notify()
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    window.addEventListener("storage", listener)
    return () => {
      listeners.delete(listener)
      window.removeEventListener("storage", listener)
    }
  },
}
