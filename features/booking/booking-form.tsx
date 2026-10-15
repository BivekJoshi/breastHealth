"use client"

import { useState } from "react"
import { ArrowRight, CircleCheck } from "lucide-react"
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
import { centres } from "@/content/locations"
import { groupByCity } from "@/features/locations/directory"
import { useI18n } from "@/i18n/client"
import { cn } from "@/lib/utils"

export const HOME_VISIT = "home"

const groups = groupByCity(centres)

const fieldClass = "h-12 rounded-2xl border-petal bg-paper px-4 text-base shadow-none focus-visible:bg-white"

// Frontend only: shows a confirmation. Connect `onSubmit` to an API later.
export function BookingForm({ defaultCentre = "" }: { defaultCentre?: string }) {
  const { t } = useI18n()
  const [centre, setCentre] = useState(defaultCentre)
  const [sent, setSent] = useState<{ name: string; phone: string } | null>(null)

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
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setSent({
          name: String(data.get("name")).trim().split(/\s+/)[0],
          phone: String(data.get("phone")).trim(),
        })
      }}
    >
      <Field label={t(copy.name)} htmlFor="name">
        <Input id="name" name="name" required autoComplete="name" className={fieldClass} />
      </Field>
      <Field label={t(copy.phone)} htmlFor="phone">
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="98XXXXXXXX"
          className={fieldClass}
        />
      </Field>
      <Field label={t(copy.age)} htmlFor="age" optional={optional}>
        <Input id="age" name="age" type="number" min={18} max={110} className={fieldClass} />
      </Field>
      <Field label={t(copy.date)} htmlFor="date" optional={optional}>
        <Input id="date" name="date" type="date" className={fieldClass} />
      </Field>

      <Field label={t(copy.where)} htmlFor="centre" className="sm:col-span-2">
        <Select name="centre" value={centre} onValueChange={setCentre} required>
          <SelectTrigger id="centre" className={cn(fieldClass, "h-12! w-full")}>
            <SelectValue placeholder={t(copy.choose)} />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-80">
            <SelectItem value={HOME_VISIT}>{t(copy.atHome)}</SelectItem>
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
          placeholder={t(copy.messageHint)}
          className={cn(fieldClass, "h-auto py-3")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="xl">
          {t(copy.submit)}
          <ArrowRight data-icon="inline-end" />
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
