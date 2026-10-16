import type { Bilingual } from "./types"

// SAMPLE contact details and domain — replace before going live.
export const site = {
  name: "BreastScan",
  nameNe: "स्तन जाँच केन्द्र",
  url: "https://breastscan.com.np",
  title: {
    en: "BreastScan — AI thermal breast screening in Nepal",
    ne: "BreastScan — नेपालमा एआई थर्मल स्तन स्क्रिनिङ",
  },
  description: {
    en: "Radiation-free, no-touch AI thermal breast screening for women aged 18 to 80+, at centres across Nepal.",
    ne: "१८ देखि ८०+ वर्षका महिलाका लागि विकिरण र स्पर्शरहित एआई थर्मल स्तन स्क्रिनिङ, नेपालभरका केन्द्रहरूमा।",
  },
  phone: "+977-9800000000",
  email: "info@breastscan.com.np",
  address: { en: "Jawalakhel, Lalitpur 44700", ne: "जावलाखेल, ललितपुर ४४७००" },
  hours: { en: "Sunday to Friday, 9 AM – 5 PM", ne: "आइतबारदेखि शुक्रबार, बिहान ९ – बेलुका ५" },
} as const satisfies Record<string, string | Bilingual>

/** App paths without the locale; components localise them. */
export const paths = {
  home: "/",
  screening: "/screening",
  locations: "/locations",
  faq: "/#faq",
  /** The home page's "Know your body" section. */
  know: "/#know",
  book: "/book",
  /** One post is /news?post=<slug>: posts come from the API, so there is no page per post in the static build. */
  news: "/news",
} as const

export const nav: { label: Bilingual; path: string }[] = [
  { label: { en: "The test", ne: "परीक्षण" }, path: paths.screening },
  { label: { en: "Locations", ne: "केन्द्रहरू" }, path: paths.locations },
  { label: { en: "News", ne: "समाचार" }, path: paths.news },
  { label: { en: "FAQ", ne: "प्रश्नोत्तर" }, path: paths.faq },
]
