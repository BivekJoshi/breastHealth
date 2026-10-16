"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { CalendarCheck, ExternalLink, KeyRound, LogOut, MapPin, Newspaper } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { paths } from "@/content/site"
import { useI18n } from "@/i18n/client"
import { ApiError, apiFetch } from "@/lib/api"
import { cn } from "@/lib/utils"
import { type AdminAppointments, type AdminRequest, type AdminUser, tokenStore } from "./admin-api"
import { AppointmentsManager } from "./appointments-manager"
import { PasswordEditor } from "./editors"
import { FormMessage, TextField, useApiForm } from "./form"
import { LocationsManager } from "./locations-manager"
import { NewsManager } from "./news-manager"

const EXPIRED = "Your session has expired. Please sign in again."

/**
 * The website admin: sign in, then work through appointment requests, write
 * news, and manage the cities and centres.
 *
 * The page is part of the static export, so everything here happens in the
 * browser against the API — the HTML itself holds no data and needs no rebuild.
 */
export function AdminApp() {
  // undefined during the prerender, then the stored token (or null) in the browser.
  const token = useSyncExternalStore(tokenStore.subscribe, tokenStore.get, () => undefined)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const signOut = useCallback((reason: string | null = null) => {
    setUser(null)
    setNotice(reason)
    tokenStore.clear()
  }, [])

  // A stored token is checked once before the screen trusts it.
  useEffect(() => {
    if (!token || user) return
    let cancelled = false
    apiFetch<{ user: AdminUser }>("/auth/me", { token }).then(
      (data) => !cancelled && setUser(data.user),
      (error) => {
        if (cancelled) return
        if (error instanceof ApiError && error.status === 401) signOut(EXPIRED)
        else setNotice(error.message)
      }
    )
    return () => {
      cancelled = true
    }
  }, [token, user, signOut])

  const request: AdminRequest = useCallback(
    async <T,>(path: string, options: Parameters<AdminRequest>[1] = {}) => {
      try {
        return await apiFetch<T>(path, { ...options, token })
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) signOut(EXPIRED)
        throw error
      }
    },
    [token, signOut]
  )

  if (token && user) return <AdminShell user={user} request={request} onSignOut={() => signOut()} />

  if (token === null) {
    return (
      <Frame>
        <LoginForm
          notice={notice}
          onSignedIn={(nextToken, nextUser) => {
            setUser(nextUser)
            setNotice(null)
            tokenStore.set(nextToken)
          }}
        />
      </Frame>
    )
  }

  // Prerender, or a stored token still being checked.
  return (
    <Frame>
      <div role="status" className="mx-auto max-w-md rounded-[2rem] bg-white p-8 text-center shadow-soft">
        {notice ? (
          <>
            <FormMessage message={notice} />
            <Button variant="outline" size="lg" className="mt-5 h-11 rounded-full px-5" onClick={() => signOut()}>
              Back to sign in
            </Button>
          </>
        ) : (
          <p className="text-mauve">Checking your session…</p>
        )}
      </div>
    </Frame>
  )
}

function Frame({ children, actions }: { children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="flex-1 bg-paper">
      <header className="border-b border-border bg-white/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
          <Logo className="h-10" />
          <span className="rounded-full bg-lilac px-3 py-1 text-sm font-extrabold text-lilac-deep">Website admin</span>
          <div className="ml-auto flex flex-wrap items-center gap-1">{actions}</div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">{children}</main>
    </div>
  )
}

const TABS = [
  { id: "appointments", label: "Appointments", title: "Appointments", icon: CalendarCheck, sitePath: paths.book },
  { id: "news", label: "News", title: "News", icon: Newspaper, sitePath: paths.news },
  { id: "locations", label: "Locations", title: "Screening centres", icon: MapPin, sitePath: paths.locations },
] as const

type Tab = (typeof TABS)[number]["id"]

/** The open tab lives in the URL hash, so a refresh or a bookmark lands on it. */
const tabFromHash = (): Tab => TABS.find((t) => `#${t.id}` === window.location.hash)?.id ?? "appointments"

function AdminShell({
  user,
  request,
  onSignOut,
}: {
  user: AdminUser
  request: AdminRequest
  onSignOut: () => void
}) {
  const { href } = useI18n()
  // Only ever rendered in the browser (after the session check), so reading the hash here is safe.
  const [tab, setTab] = useState<Tab>(tabFromHash)
  const [newCount, setNewCount] = useState<number | null>(null)
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const current = TABS.find((t) => t.id === tab) ?? TABS[0]

  // The badge on the Appointments tab, whichever tab opens first.
  useEffect(() => {
    request<AdminAppointments>("/admin/appointments?status=new&pageSize=1").then(
      (data) => setNewCount(data.counts.new),
      () => {}
    )
  }, [request])

  const open = (next: Tab) => {
    setTab(next)
    window.history.replaceState(null, "", `#${next}`)
  }

  return (
    <Frame
      actions={
        <>
          <Button asChild variant="ghost" size="lg" className="rounded-full">
            <Link href={href(current.sitePath)} target="_blank">
              <ExternalLink data-icon="inline-start" />
              View site
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full" onClick={() => setChangingPassword(true)}>
            <KeyRound data-icon="inline-start" />
            Password
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full" onClick={onSignOut}>
            <LogOut data-icon="inline-start" />
            Sign out
          </Button>
        </>
      }
    >
      <div role="tablist" aria-label="Admin sections" className="mb-8 flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`tab-${id}`}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            onClick={() => open(id)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-navy shadow-soft ring-1 ring-petal transition-colors hover:bg-blush aria-selected:bg-navy aria-selected:text-white aria-selected:ring-navy"
          >
            <Icon className="size-4" />
            {label}
            {id === "appointments" && !!newCount && (
              <span
                aria-label={`${newCount} new`}
                className={cn(
                  "min-w-6 rounded-full px-1.5 text-center text-xs leading-6 font-extrabold tabular-nums",
                  tab === id ? "bg-white text-navy" : "bg-rose text-white"
                )}
              >
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <h1 className="font-display text-4xl font-semibold text-navy">{current.title}</h1>
        <p className="mt-1 mb-6 text-mauve">
          Signed in as {user.name} ({user.email})
          {passwordChanged && <span className="font-semibold text-lilac-deep"> · Password changed.</span>}
        </p>

        {tab === "appointments" && <AppointmentsManager request={request} onNewCount={setNewCount} />}
        {tab === "news" && <NewsManager request={request} />}
        {tab === "locations" && <LocationsManager request={request} />}
      </div>

      <Sheet open={changingPassword} onOpenChange={setChangingPassword}>
        <SheetContent className="w-full! overflow-y-auto bg-white sm:max-w-md!">
          <PasswordEditor
            request={request}
            onSaved={() => {
              setChangingPassword(false)
              setPasswordChanged(true)
            }}
          />
        </SheetContent>
      </Sheet>
    </Frame>
  )
}

function LoginForm({
  notice,
  onSignedIn,
}: {
  notice: string | null
  onSignedIn: (token: string, user: AdminUser) => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    const data = await apiFetch<{ token: string; user: AdminUser }>("/auth/login", {
      method: "POST",
      body: { email, password },
    })
    onSignedIn(data.token, data.user)
  })

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto grid max-w-md gap-5 rounded-[2rem] bg-white p-8 shadow-soft">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Sign in</h1>
        <p className="mt-1 text-mauve">Manage appointment requests, news and the screening centres on the website.</p>
      </div>
      <FormMessage message={message ?? notice} />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        autoFocus
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      <Button type="submit" size="xl" disabled={saving}>
        {saving ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
