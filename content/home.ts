import type { Bilingual, SectionCopy } from "./types"

// A strong first line, a soft word, then the accent.
const heroTitle: Bilingual<{ first: string; soft: string; accent: string; after?: string }> = {
  en: { first: "Early detection", soft: "brings ", accent: "peace of mind." },
  ne: { first: "प्रारम्भिक पहिचानले", soft: "", accent: "मनको शान्ति", after: " दिन्छ।" },
}

export const hero = {
  badge: { en: "AI thermal breast screening · Nepal", ne: "एआई थर्मल स्तन स्क्रिनिङ · नेपाल" },
  title: heroTitle,
  lead: {
    en: "BreastScan uses AI-powered thermal imaging to look for early changes in your breasts — no radiation, no touch, no pain. A safer, gentler way to take care of yourself.",
    ne: "BreastScan ले एआईमा आधारित थर्मल इमेजिङ प्रयोग गरेर स्तनमा हुने प्रारम्भिक परिवर्तन खोज्छ — न विकिरण, न स्पर्श, न दुखाइ। आफ्नो ख्याल राख्ने सुरक्षित र सहज तरिका।",
  },
  findCentre: { en: "Find a centre", ne: "केन्द्र खोज्नुहोस्" },
  features: [
    { id: "safe", label: { en: "Safe & non‑invasive", ne: "सुरक्षित र स्पर्शरहित" } },
    { id: "visit", label: { en: "30-minute visit", ne: "३० मिनेटको भेट" } },
    { id: "ages", label: { en: "Ages 18 to 80+", ne: "१८ देखि ८०+ वर्ष" } },
    { id: "report", label: { en: "Report in 1–2 days", ne: "१–२ दिनमा रिपोर्ट" } },
  ] satisfies { id: string; label: Bilingual }[],

  // The picture on the right
  photoAlt: {
    en: "A smiling woman in a pink sweater, with a thermal scan of her chest",
    ne: "गुलाबी स्विटर लगाएकी मुस्कुराउँदी महिला, छातीको थर्मल स्क्यानसहित",
  },
  result: {
    eyebrow: { en: "Sample result", ne: "नमुना नतिजा" },
    title: { en: "No abnormality detected", ne: "कुनै असामान्यता देखिएन" },
    text: { en: "Your thermal scan is normal.", ne: "तपाईंको थर्मल स्क्यान सामान्य छ।" },
    link: { en: "How reports work", ne: "रिपोर्ट कसरी बन्छ" },
  },
  note: { en: "Your health matters", ne: "तपाईंको स्वास्थ्य महत्त्वपूर्ण छ" },
}

export const promisesCopy: SectionCopy = {
  title: {
    en: { before: "Safe, ", accent: "gentle", after: " and private." },
    ne: { before: "सुरक्षित, ", accent: "कोमल", after: " र गोप्य।" },
  },
}

export const visitCopy: SectionCopy & {
  barLabel: Bilingual<(minutes: string) => string>
  unit: Bilingual
  range: Bilingual<(from: string, to: string) => string>
  total: Bilingual<(minutes: string) => string>
} = {
  title: { en: "Thirty minutes, start to finish.", ne: "सुरुदेखि अन्त्यसम्म ३० मिनेट।" },
  lead: {
    en: "Most of your visit is quiet rest, so the camera gets an accurate reading. The images themselves take only a few minutes.",
    ne: "भ्रमणको धेरैजसो समय शान्त आराममा बित्छ, जसले क्यामेरालाई सही नाप लिन मद्दत गर्छ। तस्बिर खिच्न भने केही मिनेट मात्र लाग्छ।",
  },
  barLabel: { en: (m) => `${m} min`, ne: (m) => `${m} मिनेट` },
  unit: { en: "minutes", ne: "मिनेट" },
  range: { en: (a, b) => `${a}–${b} min`, ne: (a, b) => `${a}–${b} मिनेट` },
  total: { en: (m) => `${m} minutes in all`, ne: (m) => `जम्मा ${m} मिनेट` },
}

export const agesCopy: SectionCopy & { caption: Bilingual; gap: Bilingual } = {
  title: {
    en: { before: "Screening that starts at ", accent: "18", after: "." },
    ne: { before: "", accent: "१८ वर्षदेखि", after: " नै स्क्रिनिङ।" },
  },
  lead: {
    en: "Mammography is usually offered from 40, and it is less reliable in dense breast tissue — which is common in younger women. Thermal screening is designed for any age and any breast density.",
    ne: "म्यामोग्राफी प्रायः ४० वर्षपछि मात्र गरिन्छ, र बाक्लो स्तन तन्तुमा यो कम भरपर्दो हुन्छ — जुन कम उमेरका महिलामा सामान्य हो। थर्मल स्क्रिनिङ जुनसुकै उमेर र स्तन घनत्वका लागि बनाइएको हो।",
  },
  caption: { en: "Age in years", ne: "उमेर (वर्षमा)" },
  gap: { en: "Before 40", ne: "४० वर्षअघि" },
}

export const centresCopy: SectionCopy & {
  summary: Bilingual<(centres: string, cities: string, provinces: string) => string>
  pending: Bilingual
  cta: Bilingual
  cityLabel: Bilingual<(city: string, count: string) => string>
} = {
  title: { en: "Find a centre near you.", ne: "नजिकको केन्द्र खोज्नुहोस्।" },
  summary: {
    en: (c, ci, p) =>
      `${c} ${c === "1" ? "centre" : "centres"} in ${ci} ${ci === "1" ? "city" : "cities"} across ${p} ${p === "1" ? "province" : "provinces"}. Pick your city to see addresses and call directly.`,
    ne: (c, ci, p) => `${p} प्रदेशका ${ci} सहरमा ${c} केन्द्र। ठेगाना हेर्न र सिधै फोन गर्न आफ्नो सहर छान्नुहोस्।`,
  },
  /** When the live list is empty or could not be loaded. */
  pending: {
    en: "Screening centres are opening across Nepal. See the locations page for addresses and phone numbers, or book a home visit.",
    ne: "नेपालभर स्क्रिनिङ केन्द्रहरू खुल्दैछन्। ठेगाना र फोन नम्बरका लागि केन्द्र पृष्ठ हेर्नुहोस्, वा घरमै जाँच बुक गर्नुहोस्।",
  },
  cta: { en: "See all locations", ne: "सबै केन्द्र हेर्नुहोस्" },
  cityLabel: {
    en: (city, n) => `${city}: ${n} ${n === "1" ? "centre" : "centres"}`,
    ne: (city, n) => `${city}: ${n} केन्द्र`,
  },
}

export const faqCopy: SectionCopy & { call: Bilingual } = {
  title: { en: "Questions women ask us.", ne: "महिलाहरूले सोध्ने प्रश्नहरू।" },
  call: { en: "Something else on your mind?", ne: "अरू केही जान्न चाहनुहुन्छ?" },
}
