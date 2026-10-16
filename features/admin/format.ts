import type { AdminAppointment, AppointmentStatus } from "./admin-api"

/** "2026-10-16" → "16 Oct 2026", without the time zone shifting the day. */
export const formatDay = (day: string) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })

/** When a request arrived, in Nepal time — the server stores UTC. */
export const formatReceived = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kathmandu",
  })

export const placeOf = (a: AdminAppointment) => (a.at_home ? "Home visit" : a.centre_name || "Centre not recorded")

export const statusTone: Record<AppointmentStatus, string> = {
  new: "bg-rose text-white",
  confirmed: "bg-lilac text-lilac-deep",
  completed: "bg-navy/10 text-navy",
  cancelled: "bg-paper text-mauve ring-1 ring-border",
}
