"use client"

import { useSearchParams } from "next/navigation"
import { BookingForm } from "./booking-form"

/** Pre-selects the centre from ?centre=<id> (linked from the locations page). */
export function BookingFormFromUrl() {
  // Raw value: the form checks it against the centre list once it has loaded.
  const centre = useSearchParams().get("centre") ?? ""
  return <BookingForm key={centre} defaultCentre={centre} />
}
