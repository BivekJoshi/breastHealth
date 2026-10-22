import type { Bilingual, SectionCopy } from "./types"

/** The home page's search snippet. The title already names the brand, so it skips the layout's title template. */
export const homeMeta = {
  title: {
    en: "Breast Scan Nepal | Breast health and screening information",
    ne: "BreastScan Nepal | स्तन स्वास्थ्य तथा स्क्रिनिङ सम्बन्धी जानकारी",
  },
  description: {
    en: "Breast health, possible signs of breast cancer, screening methods and Niramai Thermalytix technology, explained for women in Nepal.",
    ne: "नेपालमा स्तन स्वास्थ्य, स्तन क्यान्सरका सम्भावित लक्षण, स्क्रिनिङ विधि र Niramai Thermalytix प्रविधिबारे नेपाली भाषामा जानकारी।",
  },
  keywords: [
    "स्तन क्यान्सर परीक्षण नेपाल",
    "स्तन स्वास्थ्य परीक्षण",
    "स्तनमा गाँठो आएमा के गर्ने",
    "Breast Cancer Screening Nepal",
    "Niramai Thermalytix Nepal",
  ],
} satisfies { title: Bilingual; description: Bilingual; keywords: string[] }

// A strong first line, a soft word, then the accent.
const heroTitle: Bilingual<{ first: string; soft: string; accent: string; after?: string }> = {
  en: { first: "Be breast aware.", soft: "Get checked ", accent: "in time." },
  ne: { first: "स्तन स्वास्थ्यप्रति सचेत बनौँ,", soft: "", accent: "समयमै", after: " जाँच गरौँ।" },
}

export const hero = {
  badge: { en: "AI thermal breast scan · Nepal", ne: "एआई थर्मल स्तन स्क्रिनिङ · नेपाल" },
  title: heroTitle,
  lead: {
    en: "Learn about your breast health, understand the screening options available, and talk to a health worker when you need to.",
    ne: "आफ्नो स्तन स्वास्थ्यबारे जान्नुहोस्। उपलब्ध स्क्रिनिङ विकल्प बुझ्नुहोस् र आवश्यक पर्दा स्वास्थ्यकर्मीसँग परामर्श लिनुहोस्।",
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

export const thermalytixCopy: SectionCopy & { keepInMind: Bilingual; more: Bilingual } = {
  title: {
    en: { before: "What is Niramai ", accent: "Thermalytix", after: "?" },
    ne: { before: "Niramai ", accent: "Thermalytix", after: " के हो?" },
  },
  lead: {
    en: "Niramai Thermalytix is a technology based on artificial intelligence (AI) and thermal imaging. The test is contact-free and uses no ionising radiation.",
    ne: "Niramai Thermalytix कृत्रिम बुद्धिमत्ता (AI) र थर्मल इमेजिङमा आधारित प्रविधि हो। यसको परीक्षण प्रक्रिया सम्पर्करहित र आयनीकरण विकिरणरहित हुन्छ।",
  },
  keepInMind: { en: "Keep in mind", ne: "ध्यान दिनुपर्ने कुरा" },
  more: { en: "More about the test", ne: "परीक्षणबारे थप जान्नुहोस्" },
}

export const thermalytixFacts: { id: "ai" | "contact" | "radiation"; label: Bilingual }[] = [
  { id: "ai", label: { en: "AI + thermal imaging", ne: "एआई र थर्मल इमेजिङ" } },
  { id: "contact", label: { en: "Contact-free", ne: "सम्पर्करहित" } },
  { id: "radiation", label: { en: "No ionising radiation", ne: "आयनीकरण विकिरणरहित" } },
]

/** What the result can and cannot tell you. */
export const thermalytixLimits: Bilingual[] = [
  {
    ne: "यसको नतिजाले मात्र स्तन क्यान्सर भएको वा नभएको निश्चित गर्दैन।",
    en: "Its result alone cannot confirm whether you do or don’t have breast cancer.",
  },
  {
    ne: "यो चिकित्सकले आवश्यक ठहर्‍याएका अन्य परीक्षणको विकल्प होइन।",
    en: "It does not replace other tests your doctor says you need.",
  },
  {
    ne: "स्तनमा नयाँ गाँठो, दुखाइ, वा अन्य असामान्य परिवर्तन देखिएमा तुरुन्त स्वास्थ्यकर्मीसँग परामर्श लिनुहोस्।",
    en: "If you notice a new lump, pain or any other unusual change in your breast, see a health worker right away.",
  },
  {
    ne: "स्क्रिनिङका लागि बुकिङ गर्दा सँगै, डाक्टरको परामर्श लिनु राम्रो हुन्छ।",
    en: "When you book a screening, it’s a good idea to see a doctor as well.",
  },
]

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
  lead: {
    en: "Looking for breast health information or a screening centre? BreastScan.health brings together screening centres across Nepal, breast health information and the Thermalytix screening service. Choose the centre nearest you and get in touch for an appointment. This screening is not a substitute for a medical diagnosis — talk to a qualified health worker about your results.",
    ne: "स्तन स्वास्थ्यबारे जानकारी र स्क्रिनिङ केन्द्र खोज्दै हुनुहुन्छ? BreastScan.health मा नेपालका स्क्रिनिङ केन्द्र, स्तन स्वास्थ्यसम्बन्धी जानकारी र Thermalytix स्क्रिनिङ सेवाबारे जान्नुहोस्। नजिकको केन्द्र छान्नुहोस् र अपोइन्टमेन्टका लागि सम्पर्क गर्नुहोस्। यो स्क्रिनिङ चिकित्सकीय निदानको विकल्प होइन। नतिजाबारे योग्य स्वास्थ्यकर्मीसँग परामर्श लिनुहोस्।",
  },
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
