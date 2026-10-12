import { notFound } from "next/navigation"

// Any unknown path under /en or /ne shows the localized 404 (app/[lang]/not-found.tsx).
export default function CatchAll() {
  notFound()
}
