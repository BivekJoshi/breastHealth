import type { Metadata } from "next"
import { AdminApp } from "@/features/admin/admin-app"

// Staff-only, and outside the (site) group so it has no public header or footer.
export const metadata: Metadata = {
  title: "Website admin",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminApp />
}
