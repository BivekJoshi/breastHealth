"use client"

import { useState } from "react"
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { bookingForm as copy } from "@/content/booking"
import { finderCopy } from "@/content/locations"
import { site } from "@/content/site"
import { useLocations } from "@/features/locations/use-locations"
import { useI18n } from "@/i18n/client"
import { ApiError, apiFetch } from "@/lib/api"
import { cn } from "@/lib/utils"
import { HOME_VISIT } from "./choices"

const fieldClass = "h-12 rounded-2xl border-petal bg-paper px-4 text-base shadow-none focus-visible:bg-white"

/** Sends the request to POST /api/appointments, where it waits in the admin for a call back. */
export function BookingForm({ defaultCentre = "" }: { defaultCentre?: string }) {
  const { t, locale } = useI18n()
  const locations = useLocations()
  const directory = locations.status === "ready" ? locations.directory : null
  const groups = directory ? directory.groupByCity(directory.centres) : []

  const [centre, setCentre] = useState(defaultCentre)
  const [sent, setSent] = useState<{ name: string; phone: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Field names the API refused, keyed as the inputs are named.
  const [invalid, setInvalid] = useState<Set<string>>(new Set())

  // A ?centre= id only counts once the list has loaded and it is still on it.
  const selected = centre === HOME_VISIT || directory?.isCentreId(centre) ? centre : ""

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <span className="grid size-16 place-items-center rounded-full bg-blush">
          <CircleCheck className="size-9 text-rose" />
        </span>
        <h2 className="font-display text-3xl font-semibold text-navy">{t(copy.sentTitle)}</h2>
        <p className="max-w-md text-lg text-mauve">{t(copy.sentText)(sent.name, sent.phone)}</p>
        <Button variant="outline" size="lg" className="h-11 rounded-full px-5" onClick={() => setSent(null)}>
          {t(copy.again)}
        </Button>
      </div>
    )
  }

  const optional = t(copy.optional)

  return (
    <form
      className="grid gap-6 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const field = (name: string) => String(data.get(name) ?? "").trim()

        setSending(true)
        setError(null)
        setInvalid(new Set())
        try {
          await apiFetch("/appointments", {
            method: "POST",
            body: {
              name: field("name"),
              phone: field("phone"),
              age: field("age"),
              preferredDate: field("date"),
              centre: selected,
              message: field("message"),
              locale,
              website: field("website"),
            },
          })
          setSent({ name: field("name").split(/\s+/)[0], phone: field("phone") })
        } catch (failure) {
          if (failure instanceof ApiError && failure.status === 400) {
            // The API names its fields after the payload; the inputs use "date".
            const fields = Object.keys(failure.fields).map((f) => (f === "preferredDate" ? "date" : f))
            setInvalid(new Set(fields))
            setError(t(fields.length === 1 && fields[0] === "date" ? copy.pastDate : copy.invalid))
          } else if (failure instanceof ApiError && failure.status === 429) {
            setError(t(copy.tooMany)(site.phone))
          } else {
            setError(t(copy.failed)(site.phone))
          }
        } finally {
          setSending(false)
        }
      }}
    >
      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-2xl bg-destructive/10 px-4 py-3 font-semibold text-destructive sm:col-span-2">
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          {error}
        </p>
      )}

      {/* Honeypot: hidden from people, filled in by bots. The API drops anything that sets it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label={t(copy.name)} htmlFor="name">
        <Input id="name" name="name" required autoComplete="name" aria-invalid={invalid.has("name") || undefined} className={fieldClass} />
      </Field>
      <Field label={t(copy.phone)} htmlFor="phone">
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={invalid.has("phone") || undefined}
          placeholder="98XXXXXXXX"
          className={fieldClass}
        />
      </Field>
      <Field label={t(copy.age)} htmlFor="age" optional={optional}>
        <Input id="age" name="age" type="number" min={18} max={110} aria-invalid={invalid.has("age") || undefined} className={fieldClass} />
      </Field>
      <Field label={t(copy.date)} htmlFor="date" optional={optional}>
        <Input id="date" name="date" type="date" aria-invalid={invalid.has("date") || undefined} className={fieldClass} />
      </Field>

      <Field label={t(copy.where)} htmlFor="centre" className="sm:col-span-2">
        {/* Radix reports "" while the list is arriving and its option does not exist yet;
            no item has an empty value, so that must not clear a ?centre= pre-selection. */}
        <Select name="centre" value={selected} onValueChange={(value) => value && setCentre(value)} required>
          <SelectTrigger id="centre" aria-invalid={invalid.has("centre") || undefined} className={cn(fieldClass, "h-12! w-full")}>
            <SelectValue placeholder={t(copy.choose)} />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-80">
            <SelectItem value={HOME_VISIT}>{t(copy.atHome)}</SelectItem>
            {locations.status !== "ready" && (
              <SelectItem value="unavailable" disabled>
                {t(locations.status === "loading" ? finderCopy.loading : finderCopy.failed)}
              </SelectItem>
            )}
            {groups.map(({ city, centres }) => (
              <SelectGroup key={city.id}>
                <SelectLabel>{t(city)}</SelectLabel>
                {centres.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {t(c.name)}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label={t(copy.message)} htmlFor="message" optional={optional} className="sm:col-span-2">
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          aria-invalid={invalid.has("message") || undefined}
          placeholder={t(copy.messageHint)}
          className={cn(fieldClass, "h-auto py-3")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="xl" disabled={sending}>
          {t(sending ? copy.sending : copy.submit)}
          {!sending && <ArrowRight data-icon="inline-end" />}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  className,
  children,
}: {
  label: string
  htmlFor: string
  /** Translated "optional" marker; omit for required fields. */
  optional?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-2 text-[0.95rem]">
        {label}
        {optional && <span className="text-sm font-normal text-mauve">{optional}</span>}
      </Label>
      {children}
    </div>
  )
}
