"use client"

import { useSearchParams } from "next/navigation"
import { centres } from "@/content/locations"
import { BookingForm, HOME_VISIT } from "./booking-form"

const validChoices = new Set([HOME_VISIT, ...centres.map((c) => c.id)])

/** Pre-selects the centre from ?centre=<id> (linked from the locations page). */
export function BookingFormFromUrl() {
  const centre = useSearchParams().get("centre")
  const defaultCentre = centre && validChoices.has(centre) ? centre : ""
  return <BookingForm key={defaultCentre} defaultCentre={defaultCentre} />
}
