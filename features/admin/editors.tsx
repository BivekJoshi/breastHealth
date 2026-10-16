"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type {
  AdminAppointment,
  AdminAppointments,
  AdminCentre,
  AdminCity,
  AdminLocations,
  AdminNewsPost,
  AdminRequest,
} from "./admin-api"
import { Field, FormMessage, TextAreaField, TextField, VisibleField, fieldClass, useApiForm } from "./form"
import { formatDay, formatReceived, placeOf } from "./format"
import { NewsImagesField } from "./news-images-field"

/*
 * The slide-over forms. Each sends camelCase fields — the names the API
 * validates and reports errors under — and hands a one-line summary back to
 * the list, which reloads and shows it.
 */

type Saved = (summary: string) => void

function EditorShell({
  title,
  description,
  onSubmit,
  message,
  saving,
  submitLabel,
  waitingLabel,
  children,
}: {
  title: string
  description: string
  onSubmit: (event: React.FormEvent) => void
  message: string | null
  saving: boolean
  submitLabel: string
  /** Set while the form cannot be sent yet, e.g. "Uploading photos…". */
  waitingLabel?: string | null
  children: React.ReactNode
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex min-h-full flex-col">
      <SheetHeader className="px-6 pt-6">
        <SheetTitle className="font-display text-2xl font-semibold text-navy">{title}</SheetTitle>
        <SheetDescription className="text-mauve">{description}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-5 px-6 py-2">
        <FormMessage message={message} />
        {children}
      </div>
      <div className="mt-auto flex gap-2 px-6 py-6">
        <Button type="submit" size="lg" className="h-11 rounded-full px-6" disabled={saving || !!waitingLabel}>
          {saving ? "Saving…" : (waitingLabel ?? submitLabel)}
        </Button>
      </div>
    </form>
  )
}

/* ------------------------------ city ------------------------------ */

export function CityEditor({
  city,
  provinces,
  request,
  onSaved,
}: {
  city: AdminCity | null
  provinces: AdminLocations["provinces"]
  request: AdminRequest
  onSaved: Saved
}) {
  const [values, setValues] = useState({
    nameEn: city?.name_en ?? "",
    nameNe: city?.name_ne ?? "",
    province: city?.province ?? "",
    sortOrder: String(city?.sort_order ?? 0),
    isActive: city?.is_active ?? true,
  })
  const set = (patch: Partial<typeof values>) => setValues((v) => ({ ...v, ...patch }))

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    await request(city ? `/admin/cities/${city.id}` : "/admin/cities", {
      method: city ? "PATCH" : "POST",
      body: values,
    })
    onSaved(city ? `Saved ${values.nameEn.trim()}.` : `Added ${values.nameEn.trim()}.`)
  })

  return (
    <EditorShell
      title={city ? `Edit ${city.name_en}` : "Add a city"}
      description="Centres are listed under their city on the website, grouped by province east to west."
      onSubmit={onSubmit}
      message={message}
      saving={saving}
      submitLabel={city ? "Save city" : "Add city"}
    >
      <TextField
        id="city-name-en"
        label="City name"
        placeholder="Kathmandu"
        value={values.nameEn}
        onChange={(e) => set({ nameEn: e.target.value })}
        error={errors.nameEn}
        required
        autoFocus
      />
      <TextField
        id="city-name-ne"
        label="Nepali name"
        hint="optional — shows the English name until filled in"
        placeholder="काठमाडौं"
        lang="ne"
        value={values.nameNe}
        onChange={(e) => set({ nameNe: e.target.value })}
        error={errors.nameNe}
      />
      <Field label="Province" htmlFor="city-province" error={errors.province}>
        <Select value={values.province} onValueChange={(province) => set({ province })}>
          <SelectTrigger
            id="city-province"
            aria-invalid={!!errors.province || undefined}
            className={cn(fieldClass, "h-11! w-full")}
          >
            <SelectValue placeholder="Choose a province" />
          </SelectTrigger>
          <SelectContent position="popper">
            {provinces.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.en} <span className="text-mauve">· {p.ne}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <TextField
        id="city-sort"
        label="Sort order"
        hint="lower lists first within the province"
        type="number"
        inputMode="numeric"
        value={values.sortOrder}
        onChange={(e) => set({ sortOrder: e.target.value })}
        error={errors.sortOrder}
        className="max-w-48"
      />
      <VisibleField
        checked={values.isActive}
        onChange={(isActive) => set({ isActive })}
        hint="Turn off to hide this city and all its centres."
      />
    </EditorShell>
  )
}

/* ----------------------------- centre ----------------------------- */

export function CentreEditor({
  centre,
  defaultCityId,
  data,
  request,
  onSaved,
}: {
  centre: AdminCentre | null
  /** Pre-selects the city when adding from under a city heading. */
  defaultCityId?: number
  data: AdminLocations
  request: AdminRequest
  onSaved: Saved
}) {
  const [values, setValues] = useState({
    cityId: String(centre?.city_id ?? defaultCityId ?? ""),
    nameEn: centre?.name_en ?? "",
    nameNe: centre?.name_ne ?? "",
    addressEn: centre?.address_en ?? "",
    addressNe: centre?.address_ne ?? "",
    phone: centre?.phone ?? "",
    type: centre?.type ?? data.types[0]?.id ?? "",
    sortOrder: String(centre?.sort_order ?? 0),
    isActive: centre?.is_active ?? true,
  })
  const set = (patch: Partial<typeof values>) => setValues((v) => ({ ...v, ...patch }))

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    await request(centre ? `/admin/centres/${centre.id}` : "/admin/centres", {
      method: centre ? "PATCH" : "POST",
      body: values,
    })
    onSaved(centre ? `Saved ${values.nameEn.trim()}.` : `Added ${values.nameEn.trim()}.`)
  })

  return (
    <EditorShell
      title={centre ? `Edit ${centre.name_en}` : "Add a centre"}
      description="Shown on the locations page, the home page and in the booking form."
      onSubmit={onSubmit}
      message={message}
      saving={saving}
      submitLabel={centre ? "Save centre" : "Add centre"}
    >
      <Field label="City" htmlFor="centre-city" error={errors.cityId}>
        <Select value={values.cityId} onValueChange={(cityId) => set({ cityId })}>
          <SelectTrigger
            id="centre-city"
            aria-invalid={!!errors.cityId || undefined}
            className={cn(fieldClass, "h-11! w-full")}
          >
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-72">
            {data.provinces.map((p) => {
              const cities = data.cities.filter((c) => c.province === p.id)
              if (cities.length === 0) return null
              return (
                <SelectGroup key={p.id}>
                  <SelectLabel>{p.en}</SelectLabel>
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name_en}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )
            })}
          </SelectContent>
        </Select>
      </Field>
      <TextField
        id="centre-name-en"
        label="Centre name"
        placeholder="BreastScan Baneshwor"
        value={values.nameEn}
        onChange={(e) => set({ nameEn: e.target.value })}
        error={errors.nameEn}
        required
      />
      <TextField
        id="centre-name-ne"
        label="Nepali name"
        hint="optional"
        lang="ne"
        value={values.nameNe}
        onChange={(e) => set({ nameNe: e.target.value })}
        error={errors.nameNe}
      />
      <TextField
        id="centre-address-en"
        label="Address"
        placeholder="New Baneshwor, Kathmandu 44600"
        value={values.addressEn}
        onChange={(e) => set({ addressEn: e.target.value })}
        error={errors.addressEn}
        required
      />
      <TextField
        id="centre-address-ne"
        label="Nepali address"
        hint="optional"
        lang="ne"
        value={values.addressNe}
        onChange={(e) => set({ addressNe: e.target.value })}
        error={errors.addressNe}
      />
      <TextField
        id="centre-phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        placeholder="+977-98XXXXXXXX"
        value={values.phone}
        onChange={(e) => set({ phone: e.target.value })}
        error={errors.phone}
        required
      />
      <Field label="Type" htmlFor="centre-type" error={errors.type}>
        <div id="centre-type" role="radiogroup" className="flex flex-wrap gap-2">
          {data.types.map((type) => (
            <button
              key={type.id}
              type="button"
              role="radio"
              aria-checked={values.type === type.id}
              onClick={() => set({ type: type.id })}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold ring-1 ring-petal transition-colors hover:bg-blush aria-checked:bg-rose aria-checked:text-white aria-checked:ring-rose"
            >
              {type.en}
            </button>
          ))}
        </div>
      </Field>
      <TextField
        id="centre-sort"
        label="Sort order"
        hint="lower lists first within the city"
        type="number"
        inputMode="numeric"
        value={values.sortOrder}
        onChange={(e) => set({ sortOrder: e.target.value })}
        error={errors.sortOrder}
        className="max-w-48"
      />
      <VisibleField
        checked={values.isActive}
        onChange={(isActive) => set({ isActive })}
        hint="Turn off to take this centre off the website without deleting it."
      />
    </EditorShell>
  )
}

/* -------------------------- appointment --------------------------- */

/** The request as the visitor sent it (read-only), plus the staff's status and note. */
export function AppointmentEditor({
  appointment: a,
  statuses,
  request,
  onSaved,
}: {
  appointment: AdminAppointment
  statuses: AdminAppointments["statuses"]
  request: AdminRequest
  onSaved: Saved
}) {
  const [values, setValues] = useState({ status: a.status, adminNote: a.admin_note })

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    await request(`/admin/appointments/${a.id}`, { method: "PATCH", body: values })
    onSaved(`Saved ${a.name}’s request.`)
  })

  const details = [
    { label: "Phone", value: <a href={`tel:${a.phone}`} className="font-semibold text-rose-deep hover:underline">{a.phone}</a> },
    { label: "Age", value: a.age ?? "Not given" },
    { label: "Where", value: placeOf(a) },
    { label: "Preferred date", value: a.preferred_date ? formatDay(a.preferred_date) : "Any date" },
    { label: "Language", value: a.locale === "ne" ? "Nepali" : "English" },
    { label: "Received", value: formatReceived(a.created_at) },
  ]

  return (
    <EditorShell
      title={a.name}
      description="Record what was agreed on the call. The note is for staff only."
      onSubmit={onSubmit}
      message={message}
      saving={saving}
      submitLabel="Save"
    >
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl bg-paper p-4 text-sm ring-1 ring-petal">
        {details.map((d) => (
          <div key={d.label} className="contents">
            <dt className="font-bold text-mauve">{d.label}</dt>
            <dd className="text-berry">{d.value}</dd>
          </div>
        ))}
        {a.message && (
          <div className="col-span-2 mt-1 border-t border-petal pt-3">
            <dt className="font-bold text-mauve">Message</dt>
            <dd className="mt-1 whitespace-pre-line text-berry">{a.message}</dd>
          </div>
        )}
      </dl>
      <Field label="Status" htmlFor="appointment-status" error={errors.status}>
        <div id="appointment-status" role="radiogroup" className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={values.status === s.id}
              onClick={() => setValues((v) => ({ ...v, status: s.id }))}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold ring-1 ring-petal transition-colors hover:bg-blush aria-checked:bg-rose aria-checked:text-white aria-checked:ring-rose"
            >
              {s.en}
            </button>
          ))}
        </div>
      </Field>
      <TextAreaField
        id="appointment-note"
        label="Note"
        hint="staff only"
        rows={4}
        placeholder="e.g. Confirmed for Sunday 10 AM at Baneshwor"
        value={values.adminNote}
        onChange={(e) => setValues((v) => ({ ...v, adminNote: e.target.value }))}
        error={errors.adminNote}
        autoFocus
      />
    </EditorShell>
  )
}

/* ------------------------------ news ------------------------------ */

export function NewsEditor({
  post,
  today,
  request,
  onSaved,
}: {
  post: AdminNewsPost | null
  /** Today in Nepal, from the API — the default publish date for a new post. */
  today: string
  request: AdminRequest
  onSaved: Saved
}) {
  const [values, setValues] = useState({
    titleEn: post?.title_en ?? "",
    titleNe: post?.title_ne ?? "",
    summaryEn: post?.summary_en ?? "",
    summaryNe: post?.summary_ne ?? "",
    bodyEn: post?.body_en ?? "",
    bodyNe: post?.body_ne ?? "",
    publishedAt: post?.published_at ?? today,
    isActive: post?.is_active ?? true,
  })
  const set = (patch: Partial<typeof values>) => setValues((v) => ({ ...v, ...patch }))
  const [images, setImages] = useState(post?.images ?? [])
  const [uploading, setUploading] = useState(false)

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    await request(post ? `/admin/news/${post.id}` : "/admin/news", {
      method: post ? "PATCH" : "POST",
      // The photos are already uploaded; the post records which ones, in order.
      body: { ...values, imageIds: images.map((image) => image.id) },
    })
    onSaved(post ? `Saved “${values.titleEn.trim()}”.` : `Added “${values.titleEn.trim()}”.`)
  })

  return (
    <EditorShell
      title={post ? "Edit news post" : "Add a news post"}
      description="Shown on the website’s News page, newest first. Leave a blank line between paragraphs."
      onSubmit={onSubmit}
      message={message}
      saving={saving}
      submitLabel={post ? "Save post" : "Add post"}
      waitingLabel={uploading ? "Uploading photos…" : null}
    >
      <TextField
        id="news-title-en"
        label="Title"
        placeholder="Free screening camp in Pokhara"
        value={values.titleEn}
        onChange={(e) => set({ titleEn: e.target.value })}
        error={errors.titleEn}
        required
        autoFocus
      />
      <TextField
        id="news-title-ne"
        label="Nepali title"
        hint="optional — shows the English until filled in"
        lang="ne"
        value={values.titleNe}
        onChange={(e) => set({ titleNe: e.target.value })}
        error={errors.titleNe}
      />
      <TextAreaField
        id="news-summary-en"
        label="Summary"
        hint="optional — one or two lines for the news list"
        rows={2}
        value={values.summaryEn}
        onChange={(e) => set({ summaryEn: e.target.value })}
        error={errors.summaryEn}
      />
      <TextAreaField
        id="news-summary-ne"
        label="Nepali summary"
        hint="optional"
        lang="ne"
        rows={2}
        value={values.summaryNe}
        onChange={(e) => set({ summaryNe: e.target.value })}
        error={errors.summaryNe}
      />
      <TextAreaField
        id="news-body-en"
        label="Article"
        rows={8}
        value={values.bodyEn}
        onChange={(e) => set({ bodyEn: e.target.value })}
        error={errors.bodyEn}
        required
      />
      <TextAreaField
        id="news-body-ne"
        label="Nepali article"
        hint="optional"
        lang="ne"
        rows={8}
        value={values.bodyNe}
        onChange={(e) => set({ bodyNe: e.target.value })}
        error={errors.bodyNe}
      />
      <NewsImagesField
        images={images}
        setImages={setImages}
        request={request}
        onBusyChange={setUploading}
        error={errors.imageIds}
      />
      <TextField
        id="news-date"
        label="Publish date"
        hint="a future date schedules the post"
        type="date"
        value={values.publishedAt}
        onChange={(e) => set({ publishedAt: e.target.value })}
        error={errors.publishedAt}
        required
        className="max-w-56"
      />
      <VisibleField
        checked={values.isActive}
        onChange={(isActive) => set({ isActive })}
        hint="Turn off to keep this post as a draft."
      />
    </EditorShell>
  )
}

/* ---------------------------- password ---------------------------- */

export function PasswordEditor({ request, onSaved }: { request: AdminRequest; onSaved: Saved }) {
  const [values, setValues] = useState({ currentPassword: "", newPassword: "" })

  const { errors, message, saving, onSubmit } = useApiForm(async () => {
    await request("/auth/change-password", { method: "POST", body: values })
    onSaved("Password changed.")
  })

  return (
    <EditorShell
      title="Change password"
      description="Use at least 8 characters. You stay signed in on this device."
      onSubmit={onSubmit}
      message={message}
      saving={saving}
      submitLabel="Change password"
    >
      <TextField
        id="current-password"
        label="Current password"
        type="password"
        autoComplete="current-password"
        value={values.currentPassword}
        onChange={(e) => setValues((v) => ({ ...v, currentPassword: e.target.value }))}
        error={errors.currentPassword}
        required
        autoFocus
      />
      <TextField
        id="new-password"
        label="New password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        value={values.newPassword}
        onChange={(e) => setValues((v) => ({ ...v, newPassword: e.target.value }))}
        error={errors.newPassword}
        required
      />
    </EditorShell>
  )
}
