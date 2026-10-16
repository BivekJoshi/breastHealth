/*
 * Shrinks a photo in the browser before it is uploaded.
 *
 * A phone photo is 3–8 MB at 4000 px; the news page never shows one wider
 * than about 1200 px. Re-encoding to a 2000 px JPEG keeps it sharp on any
 * screen at a few hundred KB, which keeps the database small and the page fast.
 */

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif"

/** The API's per-image limit, checked here too so the message comes before the upload. */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

const MAX_SIDE = 2000
/** Small enough already: sent untouched, so a PNG keeps its transparency. */
const KEEP_AS_IS = 400 * 1024
const QUALITY = 0.85

export async function prepareImage(file: File): Promise<Blob> {
  // Re-drawing a GIF would keep only its first frame.
  if (file.type === "image/gif") return file

  let bitmap: ImageBitmap
  try {
    // from-image applies the camera's EXIF rotation, so portrait photos stay upright.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" })
  } catch {
    return file // not something the browser can read — the API will say so
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size <= KEEP_AS_IS) {
    bitmap.close()
    return file
  }

  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const context = canvas.getContext("2d")
  if (!context) {
    bitmap.close()
    return file
  }
  // JPEG has no transparency: give see-through areas a white background rather than black.
  context.fillStyle = "#fff"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const jpeg = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY))
  if (!jpeg) return file
  // Same size and the re-encode came out bigger: the original was the better file.
  return scale === 1 && jpeg.size >= file.size ? file : jpeg
}
