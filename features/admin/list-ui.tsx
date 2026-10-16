"use client"

import { useState } from "react"
import { CircleAlert, CircleCheck, Pencil, RotateCw, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* The pieces every admin list shares: the card, the banner, the row buttons. */

export const card = "rounded-[2rem] bg-white p-6 shadow-soft sm:p-8"
export const badge = "rounded-full px-2.5 py-0.5 text-xs font-extrabold"

export type Notice = { tone: "success" | "error"; text: string }

/**
 * The banner above a list, plus `act`: runs one row action, reports a refusal
 * in the banner, and reloads on success.
 */
export function useRowActions(reload: () => Promise<unknown>) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const act = async (id: string, action: () => Promise<unknown>, success: string) => {
    setBusyId(id)
    try {
      await action()
      setNotice({ tone: "success", text: success })
      await reload()
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "That did not work." })
    } finally {
      setBusyId(null)
    }
  }

  return { notice, setNotice, busyId, act }
}

export function NoticeBanner({ notice, onDismiss }: { notice: Notice | null; onDismiss: () => void }) {
  if (!notice) return null
  return (
    <div
      role={notice.tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-2xl px-4 py-3 font-semibold",
        notice.tone === "error" ? "bg-destructive/10 text-destructive" : "bg-lilac text-lilac-deep"
      )}
    >
      {notice.tone === "error" ? (
        <CircleAlert className="mt-0.5 size-5 shrink-0" />
      ) : (
        <CircleCheck className="mt-0.5 size-5 shrink-0" />
      )}
      <span className="flex-1">{notice.text}</span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss" className="rounded-full p-0.5 hover:bg-white/60">
        <X className="size-4" />
      </button>
    </div>
  )
}

/** Shown until the first load finishes: skeleton cards, or the error with a retry. */
export function LoadState({ error, what, onRetry }: { error: string | null; what: string; onRetry: () => void }) {
  return error ? (
    <div className={cn(card, "text-center")}>
      <p className="font-display text-2xl font-semibold">Could not load the {what}.</p>
      <p className="mt-2 text-mauve">{error}</p>
      <Button variant="outline" size="lg" className="mt-6 h-11 rounded-full px-5" onClick={onRetry}>
        <RotateCw data-icon="inline-start" />
        Try again
      </Button>
    </div>
  ) : (
    <div role="status" className="space-y-6">
      <span className="sr-only">Loading {what}…</span>
      <div aria-hidden className={cn(card, "h-48 animate-pulse")} />
      <div aria-hidden className={cn(card, "h-72 animate-pulse")} />
    </div>
  )
}

export function RowActions({
  active,
  busy,
  name,
  onToggle,
  onEdit,
  onDelete,
}: {
  active: boolean
  busy: boolean
  name: string
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-pressed={active}
        aria-label={`Visible on the site: ${name}`}
        disabled={busy}
        onClick={onToggle}
        className="rounded-full bg-paper px-3 py-1 text-xs font-extrabold text-mauve ring-1 ring-border transition-colors disabled:opacity-50 aria-pressed:bg-lilac aria-pressed:text-lilac-deep aria-pressed:ring-lavender"
      >
        {active ? "Visible" : "Hidden"}
      </button>
      <Button variant="ghost" size="icon" className="rounded-full" onClick={onEdit} aria-label={`Edit ${name}`}>
        <Pencil />
      </Button>
      <DeleteButton busy={busy} name={name} onDelete={onDelete} />
    </div>
  )
}

export function DeleteButton({ busy, name, onDelete }: { busy: boolean; name: string; onDelete: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
      disabled={busy}
      onClick={onDelete}
      aria-label={`Delete ${name}`}
    >
      <Trash2 />
    </Button>
  )
}

export function EmptyRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-paper p-5 text-mauve">
      <Icon className="size-5 shrink-0 text-rose" />
      {text}
    </div>
  )
}
