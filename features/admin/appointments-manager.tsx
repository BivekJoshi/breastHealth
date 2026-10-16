"use client"

import { useCallback, useEffect, useState } from "react"
import { CalendarDays, CalendarCheck, ChevronLeft, ChevronRight, House, Inbox, MapPin, MessageSquareText, NotebookPen, Pencil, Phone, RotateCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { AdminAppointment, AdminAppointments, AdminRequest, AppointmentStatus } from "./admin-api"
import { AppointmentEditor } from "./editors"
import { fieldClass } from "./form"
import { formatDay, formatReceived, placeOf, statusTone } from "./format"
import { DeleteButton, EmptyRow, LoadState, NoticeBanner, badge, card, useRowActions } from "./list-ui"

type Filter = AppointmentStatus | "all"

export function AppointmentsManager({
  request,
  onNewCount,
}: {
  request: AdminRequest
  /** Keeps the tab's "new" badge in step with this list. */
  onNewCount?: (count: number) => void
}) {
  const [data, setData] = useState<AdminAppointments | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>("new")
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<AdminAppointment | null>(null)

  // Search once typing pauses, from the first page.
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim())
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const reload = useCallback(() => {
    const params = new URLSearchParams({ page: String(page) })
    if (filter !== "all") params.set("status", filter)
    if (query) params.set("q", query)
    return request<AdminAppointments>(`/admin/appointments?${params}`).then(
      (next) => {
        // The last row of a later page was just deleted or moved: step back a page.
        if (next.appointments.length === 0 && next.page > 1) return setPage(next.page - 1)
        setData(next)
        setLoadError(null)
        if (!query) onNewCount?.(next.counts.new)
      },
      (error: Error) => setLoadError(error.message)
    )
  }, [request, filter, query, page, onNewCount])

  useEffect(() => {
    reload()
  }, [reload])

  const { notice, setNotice, busyId, act } = useRowActions(reload)

  const saved = (text: string) => {
    setEditing(null)
    setNotice({ tone: "success", text })
    reload()
  }

  const setStatus = (appointment: AdminAppointment, status: AppointmentStatus) => {
    const label = data?.statuses.find((s) => s.id === status)?.en.toLowerCase() ?? status
    act(
      `appointment-${appointment.id}`,
      () => request(`/admin/appointments/${appointment.id}`, { method: "PATCH", body: { status } }),
      `${appointment.name} marked ${label}.`
    )
  }

  const deleteAppointment = (appointment: AdminAppointment) => {
    if (!window.confirm(`Delete the request from ${appointment.name}? This cannot be undone.`)) return
    act(
      `appointment-${appointment.id}`,
      () => request(`/admin/appointments/${appointment.id}`, { method: "DELETE" }),
      `Deleted the request from ${appointment.name}.`
    )
  }

  if (!data) return <LoadState error={loadError} what="appointments" onRetry={reload} />

  const filters: { id: Filter; label: string }[] = [
    ...data.statuses.map((s) => ({ id: s.id, label: s.en })),
    { id: "all", label: "All" },
  ]
  const first = data.total === 0 ? 0 : (data.page - 1) * data.pageSize + 1
  const last = Math.min(data.page * data.pageSize, data.total)
  const lastPage = Math.max(Math.ceil(data.total / data.pageSize), 1)

  return (
    <div className="space-y-8">
      <p className="text-lg text-mauve">
        <strong className="text-berry">{data.counts.new}</strong> new{" "}
        {data.counts.new === 1 ? "request is" : "requests are"} waiting for a call back.
      </p>

      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />

      <section aria-labelledby="appointments" className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="appointments" className="font-display text-2xl font-semibold text-navy">
              Requests
            </h2>
            <p className="text-mauve">Sent from the website’s booking form, newest first. Call each one back to agree a time.</p>
          </div>
          <Button variant="outline" size="lg" className="h-11 rounded-full px-5" onClick={reload}>
            <RotateCw data-icon="inline-start" />
            Refresh
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id)
                  setPage(1)
                }}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold ring-1 ring-petal transition-colors hover:bg-blush aria-pressed:bg-rose aria-pressed:text-white aria-pressed:ring-rose"
              >
                {f.label} <span className="tabular-nums opacity-75">{data.counts[f.id]}</span>
              </button>
            ))}
          </div>
          <label className="relative ml-auto w-full sm:w-64">
            <span className="sr-only">Search by name or phone</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-mauve" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or phone"
              className={cn(fieldClass, "pl-10")}
            />
          </label>
        </div>

        {data.appointments.length === 0 ? (
          <EmptyRow
            icon={Inbox}
            text={
              query
                ? `Nothing matches “${query}”.`
                : filter === "new"
                  ? "No new requests. Everything has been called back."
                  : "No requests here yet."
            }
          />
        ) : (
          <ul className="mt-6 divide-y divide-border">
            {data.appointments.map((a) => (
              <li key={a.id} className="flex flex-wrap items-start gap-x-4 gap-y-3 py-4">
                <div className="min-w-0 flex-1 basis-72">
                  <p className="flex flex-wrap items-center gap-2 font-bold text-berry">
                    {a.name}
                    {a.age !== null && <span className="font-semibold text-mauve">· {a.age} yrs</span>}
                    <span className={cn(badge, statusTone[a.status])}>
                      {data.statuses.find((s) => s.id === a.status)?.en ?? a.status}
                    </span>
                    {a.locale === "ne" && <span className={cn(badge, "bg-blush text-rose-deep")}>Prefers Nepali</span>}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mauve">
                    <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1 font-semibold text-rose-deep tabular-nums hover:underline">
                      <Phone className="size-3.5" />
                      {a.phone}
                    </a>
                    <span className="inline-flex items-center gap-1">
                      {a.at_home ? <House className="size-3.5" /> : <MapPin className="size-3.5" />}
                      {placeOf(a)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarCheck className="size-3.5" />
                      {a.preferred_date ? `Prefers ${formatDay(a.preferred_date)}` : "Any date"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      Received {formatReceived(a.created_at)}
                    </span>
                  </p>
                  {a.message && (
                    <p className="mt-2 flex gap-2 text-sm whitespace-pre-line text-berry">
                      <MessageSquareText className="mt-0.5 size-3.5 shrink-0 text-rose" />
                      {a.message}
                    </p>
                  )}
                  {a.admin_note && (
                    <p className="mt-2 flex gap-2 rounded-xl bg-lilac px-3 py-2 text-sm whitespace-pre-line text-lilac-deep">
                      <NotebookPen className="mt-0.5 size-3.5 shrink-0" />
                      {a.admin_note}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Select value={a.status} onValueChange={(status) => status !== a.status && setStatus(a, status as AppointmentStatus)}>
                    <SelectTrigger
                      aria-label={`Status of ${a.name}’s request`}
                      disabled={busyId === `appointment-${a.id}`}
                      className="h-9! w-36 rounded-full border-petal bg-paper text-sm font-bold"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {data.statuses.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setEditing(a)} aria-label={`Add a note for ${a.name}`}>
                    <Pencil />
                  </Button>
                  <DeleteButton busy={busyId === `appointment-${a.id}`} name={`${a.name}’s request`} onDelete={() => deleteAppointment(a)} />
                </div>
              </li>
            ))}
          </ul>
        )}

        {data.total > data.pageSize && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-mauve">
            <span className="tabular-nums">
              Showing {first}–{last} of {data.total}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="rounded-full" disabled={data.page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft data-icon="inline-start" />
                Newer
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" disabled={data.page >= lastPage} onClick={() => setPage((p) => p + 1)}>
                Older
                <ChevronRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        )}
      </section>

      <Sheet open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent className="w-full! overflow-y-auto bg-white sm:max-w-md!">
          {editing && (
            <AppointmentEditor
              key={editing.id}
              appointment={editing}
              statuses={data.statuses}
              request={request}
              onSaved={saved}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
