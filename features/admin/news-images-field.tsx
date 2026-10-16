"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ImagePlus, LoaderCircle, X } from "lucide-react"
import { apiAsset } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { AdminNewsImage, AdminRequest } from "./admin-api"
import { Field } from "./form"
import { IMAGE_ACCEPT, MAX_IMAGE_BYTES, prepareImage } from "./prepare-image"

/** Matches the API's limit per post. */
export const MAX_IMAGES = 12

const tile = "relative aspect-square overflow-hidden rounded-xl ring-1 ring-petal"
const tileButton =
  "grid size-7 place-items-center rounded-full bg-white/90 text-berry shadow-sm transition-colors hover:bg-white disabled:opacity-40"

/**
 * The news editor's photos. Each file is shrunk in the browser and uploaded
 * the moment it is chosen; the post only records which uploads it uses, in
 * order, when it is saved. The first photo is the cover.
 */
export function NewsImagesField({
  images,
  setImages,
  request,
  onBusyChange,
  error,
}: {
  images: AdminNewsImage[]
  setImages: (update: (images: AdminNewsImage[]) => AdminNewsImage[]) => void
  request: AdminRequest
  /** True while any upload is still running — the editor holds Save until then. */
  onBusyChange: (busy: boolean) => void
  error?: string
}) {
  const [uploading, setUploading] = useState<{ id: number; name: string }[]>([])
  const [problems, setProblems] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const pending = useRef(0)
  const nextId = useRef(0)

  const room = MAX_IMAGES - images.length - uploading.length

  const addFiles = async (list: FileList | File[]) => {
    const all = Array.from(list)
    const files = all.filter((file) => file.type.startsWith("image/"))
    const accepted = files.slice(0, Math.max(room, 0))

    const notes: string[] = []
    if (files.length < all.length) notes.push("Only image files can be added.")
    if (accepted.length < files.length) {
      notes.push(`A post can have up to ${MAX_IMAGES} photos — ${files.length - accepted.length} not added.`)
    }
    setProblems(notes)
    if (accepted.length === 0) return

    const queued = accepted.map((file) => ({ id: nextId.current++, name: file.name, file }))
    pending.current += queued.length
    onBusyChange(true)
    setUploading((u) => [...u, ...queued.map(({ id, name }) => ({ id, name }))])

    // One at a time: a phone on a slow connection copes better than with twelve at once.
    for (const { id, name, file } of queued) {
      try {
        const blob = await prepareImage(file)
        if (blob.size > MAX_IMAGE_BYTES) throw new Error("larger than 5 MB, even after shrinking.")
        const { image } = await request<{ image: AdminNewsImage }>("/admin/news/images", { method: "POST", body: blob })
        setImages((current) => [...current, image])
      } catch (failure) {
        setProblems((p) => [...p, `${name}: ${failure instanceof Error ? failure.message : "could not be uploaded."}`])
      } finally {
        pending.current -= 1
        setUploading((u) => u.filter((item) => item.id !== id))
      }
    }
    onBusyChange(pending.current > 0)
  }

  const move = (index: number, by: -1 | 1) =>
    setImages((current) => {
      const next = [...current]
      ;[next[index], next[index + by]] = [next[index + by], next[index]]
      return next
    })

  const remove = (index: number) => setImages((current) => current.filter((_, i) => i !== index))

  return (
    <Field
      label="Photos"
      htmlFor="news-photos"
      hint={`optional · up to ${MAX_IMAGES} · the first is the cover`}
      error={error}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          "grid grid-cols-3 gap-2.5 rounded-2xl p-2.5 ring-1 ring-petal transition-colors",
          dragging ? "bg-blush ring-rose" : "bg-paper"
        )}
      >
        {images.map((image, index) => (
          <div key={image.id} className={cn(tile, "group bg-white")}>
            {/* An API upload of unknown size — a plain img, not next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={apiAsset(image.url)} alt={`Photo ${index + 1}`} className="size-full object-cover" />
            {index === 0 && (
              <span className="absolute top-1.5 left-1.5 rounded-full bg-rose px-2 py-0.5 text-[0.7rem] font-extrabold text-white">
                Cover
              </span>
            )}
            <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between gap-1">
              <div className="flex gap-1">
                <button
                  type="button"
                  className={tileButton}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move photo ${index + 1} earlier`}
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className={tileButton}
                  disabled={index === images.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move photo ${index + 1} later`}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <button
                type="button"
                className={cn(tileButton, "text-destructive")}
                onClick={() => remove(index)}
                aria-label={`Remove photo ${index + 1}`}
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        ))}

        {uploading.map((item) => (
          <div key={item.id} role="status" className={cn(tile, "grid place-items-center bg-white p-2 text-center")}>
            <span>
              <LoaderCircle className="mx-auto size-6 animate-spin text-rose" />
              <span className="mt-1.5 line-clamp-2 block text-xs break-all text-mauve">Uploading {item.name}</span>
            </span>
          </div>
        ))}

        {room > 0 && (
          <label
            className={cn(
              tile,
              "grid cursor-pointer place-items-center border-2 border-dashed border-petal bg-white p-2 text-center ring-0 transition-colors hover:border-rose hover:bg-blush focus-within:border-rose focus-within:ring-3 focus-within:ring-rose/30"
            )}
          >
            <span>
              <ImagePlus className="mx-auto size-6 text-rose" />
              <span className="mt-1 block text-sm font-bold text-berry">Add photos</span>
              <span className="block text-xs text-mauve">or drop them here</span>
            </span>
            <input
              id="news-photos"
              type="file"
              accept={IMAGE_ACCEPT}
              multiple
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files)
                e.target.value = "" // so choosing the same file again still fires
              }}
            />
          </label>
        )}
      </div>

      {problems.length > 0 && (
        <ul role="alert" className="mt-2 space-y-1 text-sm font-semibold text-destructive">
          {problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      )}
    </Field>
  )
}
