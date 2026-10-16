"use client"

import { useState } from "react"
import { CircleAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ApiError } from "@/lib/api"
import { cn } from "@/lib/utils"

export const fieldClass = "h-11 rounded-xl border-petal bg-paper px-3.5 text-base shadow-none focus-visible:bg-white"

/**
 * Runs `action` on submit and keeps what the API said about it: the overall
 * message for the banner, and the per-field messages under each input.
 */
export function useApiForm(action: () => Promise<void>) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage(null)
    try {
      await action()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      if (error instanceof ApiError) setErrors(error.fields)
    } finally {
      setSaving(false)
    }
  }

  return { errors, message, saving, onSubmit }
}

export function FormMessage({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl bg-destructive/10 px-3.5 py-3 text-sm font-semibold text-destructive">
      <CircleAlert className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  )
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-2 text-[0.95rem]">
        <span className="shrink-0">{label}</span>
        {hint && <span className="text-sm font-normal text-mauve">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** A labelled input wired to its error message. */
export function TextField({
  id,
  label,
  hint,
  error,
  className,
  ...input
}: Omit<React.ComponentProps<"input">, "id"> & { id: string; label: string; hint?: string; error?: string }) {
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} className={className}>
      <Input
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
        {...input}
      />
    </Field>
  )
}

/** A labelled multi-line input wired to its error message. */
export function TextAreaField({
  id,
  label,
  hint,
  error,
  className,
  ...textarea
}: Omit<React.ComponentProps<"textarea">, "id"> & { id: string; label: string; hint?: string; error?: string }) {
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} className={className}>
      <Textarea
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, "h-auto py-2.5")}
        {...textarea}
      />
    </Field>
  )
}

/** "Visible on the site", as a plain checkbox. */
export function VisibleField({
  checked,
  onChange,
  hint,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  hint: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-paper p-3.5 ring-1 ring-petal">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4.5 accent-rose"
      />
      <span>
        <span className="block font-bold text-berry">Visible on the site</span>
        <span className="block text-sm text-mauve">{hint}</span>
      </span>
    </label>
  )
}
