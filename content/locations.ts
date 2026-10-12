import type { Bilingual, SectionCopy } from "./types"

// SAMPLE screening centres — replace with real partner centres before going live.

/** All seven provinces, in official order (east → west). */
export const provinces = [
  { id: "koshi", en: "Koshi", ne: "कोशी" },
  { id: "madhesh", en: "Madhesh", ne: "मधेश" },
  { id: "bagmati", en: "Bagmati", ne: "बागमती" },
  { id: "gandaki", en: "Gandaki", ne: "गण्डकी" },
  { id: "lumbini", en: "Lumbini", ne: "लुम्बिनी" },
  { id: "karnali", en: "Karnali", ne: "कर्णाली" },
  { id: "sudurpashchim", en: "Sudurpashchim", ne: "सुदूरपश्चिम" },
] as const

export type Province = (typeof provinces)[number]
export type ProvinceId = Province["id"]

/** Cities with at least one centre, grouped by province in the same east → west order. */
export const cities = [
  { id: "biratnagar", en: "Biratnagar", ne: "विराटनगर", province: "koshi" },
  { id: "dharan", en: "Dharan", ne: "धरान", province: "koshi" },
  { id: "janakpur", en: "Janakpur", ne: "जनकपुर", province: "madhesh" },
  { id: "kathmandu", en: "Kathmandu", ne: "काठमाडौं", province: "bagmati" },
  { id: "lalitpur", en: "Lalitpur", ne: "ललितपुर", province: "bagmati" },
  { id: "bhaktapur", en: "Bhaktapur", ne: "भक्तपुर", province: "bagmati" },
  { id: "bharatpur", en: "Bharatpur", ne: "भरतपुर", province: "bagmati" },
  { id: "pokhara", en: "Pokhara", ne: "पोखरा", province: "gandaki" },
  { id: "butwal", en: "Butwal", ne: "बुटवल", province: "lumbini" },
] as const satisfies readonly (Bilingual & { id: string; province: ProvinceId })[]

export type City = (typeof cities)[number]
export type CityId = City["id"]

export const centreTypes = {
  clinic: { en: "Clinic", ne: "क्लिनिक" },
  hospital: { en: "Hospital", ne: "अस्पताल" },
  diagnostic: { en: "Diagnostic centre", ne: "डायग्नोस्टिक केन्द्र" },
} satisfies Record<string, Bilingual>

export type Centre = {
  id: string
  city: CityId
  name: Bilingual
  address: Bilingual
  phone: string
  type: keyof typeof centreTypes
}

export const centres: Centre[] = [
  { id: "biratnagar-main-road", city: "biratnagar", name: { en: "BreastScan Biratnagar", ne: "BreastScan विराटनगर" }, address: { en: "Main Road, Biratnagar 56613", ne: "मेन रोड, विराटनगर ५६६१३" }, phone: "+977-9800000010", type: "diagnostic" },
  { id: "dharan-bhanu-chowk", city: "dharan", name: { en: "BreastScan Dharan", ne: "BreastScan धरान" }, address: { en: "Bhanu Chowk, Dharan 56700", ne: "भानु चोक, धरान ५६७००" }, phone: "+977-9800000011", type: "clinic" },
  { id: "janakpur-station-road", city: "janakpur", name: { en: "BreastScan Janakpur", ne: "BreastScan जनकपुर" }, address: { en: "Station Road, Janakpurdham 45600", ne: "स्टेसन रोड, जनकपुरधाम ४५६००" }, phone: "+977-9800000013", type: "clinic" },
  { id: "kathmandu-baneshwor", city: "kathmandu", name: { en: "BreastScan Baneshwor", ne: "BreastScan बानेश्वर" }, address: { en: "New Baneshwor, Kathmandu 44600", ne: "नयाँ बानेश्वर, काठमाडौं ४४६००" }, phone: "+977-9800000001", type: "clinic" },
  { id: "kathmandu-maharajgunj", city: "kathmandu", name: { en: "BreastScan Maharajgunj", ne: "BreastScan महाराजगन्ज" }, address: { en: "Maharajgunj Chowk, Kathmandu 44600", ne: "महाराजगन्ज चोक, काठमाडौं ४४६००" }, phone: "+977-9800000002", type: "hospital" },
  { id: "kathmandu-kalanki", city: "kathmandu", name: { en: "BreastScan Kalanki", ne: "BreastScan कलंकी" }, address: { en: "Kalanki Ring Road, Kathmandu 44600", ne: "कलंकी रिङरोड, काठमाडौं ४४६००" }, phone: "+977-9800000003", type: "diagnostic" },
  { id: "lalitpur-jawalakhel", city: "lalitpur", name: { en: "BreastScan Jawalakhel", ne: "BreastScan जावलाखेल" }, address: { en: "Jawalakhel, Lalitpur 44700", ne: "जावलाखेल, ललितपुर ४४७००" }, phone: "+977-9800000004", type: "clinic" },
  { id: "lalitpur-kumaripati", city: "lalitpur", name: { en: "BreastScan Kumaripati", ne: "BreastScan कुमारीपाटी" }, address: { en: "Kumaripati, Lalitpur 44700", ne: "कुमारीपाटी, ललितपुर ४४७००" }, phone: "+977-9800000005", type: "diagnostic" },
  { id: "bhaktapur-suryabinayak", city: "bhaktapur", name: { en: "BreastScan Suryabinayak", ne: "BreastScan सूर्यविनायक" }, address: { en: "Suryabinayak, Bhaktapur 44800", ne: "सूर्यविनायक, भक्तपुर ४४८००" }, phone: "+977-9800000006", type: "clinic" },
  { id: "bharatpur-ward-10", city: "bharatpur", name: { en: "BreastScan Bharatpur", ne: "BreastScan भरतपुर" }, address: { en: "Bharatpur-10, Chitwan 44200", ne: "भरतपुर-१०, चितवन ४४२००" }, phone: "+977-9800000007", type: "hospital" },
  { id: "pokhara-lakeside", city: "pokhara", name: { en: "BreastScan Lakeside", ne: "BreastScan लेकसाइड" }, address: { en: "Lakeside Road, Pokhara 33700", ne: "लेकसाइड रोड, पोखरा ३३७००" }, phone: "+977-9800000008", type: "clinic" },
  { id: "pokhara-ramghat", city: "pokhara", name: { en: "BreastScan Ramghat", ne: "BreastScan रामघाट" }, address: { en: "Ramghat, Pokhara 33700", ne: "रामघाट, पोखरा ३३७००" }, phone: "+977-9800000009", type: "hospital" },
  { id: "butwal-traffic-chowk", city: "butwal", name: { en: "BreastScan Butwal", ne: "BreastScan बुटवल" }, address: { en: "Traffic Chowk, Butwal 32907", ne: "ट्राफिक चोक, बुटवल ३२९०७" }, phone: "+977-9800000012", type: "hospital" },
]

export const locationsPage = {
  meta: {
    title: { en: "Screening centres", ne: "स्क्रिनिङ केन्द्रहरू" },
    description: {
      en: "Find an AI thermal breast screening centre near you, anywhere in Nepal.",
      ne: "नेपालभर आफ्नो नजिकको एआई थर्मल स्तन स्क्रिनिङ केन्द्र खोज्नुहोस्।",
    },
  },
  intro: {
    title: { en: "Find a screening centre.", ne: "स्क्रिनिङ केन्द्र खोज्नुहोस्।" },
    lead: {
      en: "Choose your province and city, or search by area. Call the centre directly or book online.",
      ne: "आफ्नो प्रदेश र सहर छान्नुहोस्, वा क्षेत्रको नामले खोज्नुहोस्। केन्द्रमा सिधै फोन गर्नुहोस् वा अनलाइन बुक गर्नुहोस्।",
    },
  } satisfies SectionCopy,
  away: {
    title: { en: "Can’t get to a centre?", ne: "केन्द्रसम्म आउन सक्नुहुन्न?" },
    options: [
      {
        id: "home",
        title: { en: "Screening at home", ne: "घरमै स्क्रिनिङ" },
        text: {
          en: "The equipment is portable. A trained technician sets up a private screening in your home.",
          ne: "उपकरण बोक्न मिल्ने छ। तालिमप्राप्त प्राविधिकले तपाईंकै घरमा निजी स्क्रिनिङको व्यवस्था गर्नुहुन्छ।",
        },
        action: { en: "Book a home visit", ne: "घरमै जाँच बुक गर्नुहोस्" },
      },
      {
        id: "camp",
        title: { en: "Camps and workplaces", ne: "शिविर र कार्यस्थल" },
        text: {
          en: "Bring screening to your office, school or community group. We bring everything needed.",
          ne: "आफ्नो कार्यालय, विद्यालय वा समुदायमा स्क्रिनिङ ल्याउनुहोस्। आवश्यक सबै सामग्री हामी ल्याउँछौं।",
        },
        action: { en: "Ask about a camp", ne: "शिविरबारे सोध्नुहोस्" },
      },
    ],
  },
}

export const finderCopy = {
  search: { en: "Area, city or centre", ne: "क्षेत्र, सहर वा केन्द्र" },
  searchLabel: { en: "Search centres", ne: "केन्द्र खोज्नुहोस्" },
  province: { en: "Province", ne: "प्रदेश" },
  eastToWest: { en: "east to west", ne: "पूर्वदेखि पश्चिम" },
  city: { en: "City", ne: "सहर" },
  all: { en: "All", ne: "सबै" },
  provinceName: { en: (p: string) => `${p} Province`, ne: (p: string) => `${p} प्रदेश` },
  none: { en: (p: string) => `No centre in ${p} yet`, ne: (p: string) => `${p} मा अहिलेसम्म केन्द्र छैन` },
  count: {
    en: (n: string, c: string) =>
      `${n} ${n === "1" ? "centre" : "centres"} in ${c} ${c === "1" ? "city" : "cities"}`,
    ne: (n: string, c: string) => `${c} सहरमा ${n} केन्द्र`,
  },
  noMatch: {
    en: (q: string) => `No centre matches “${q}”.`,
    ne: (q: string) => `“${q}” सँग मिल्ने केन्द्र भेटिएन।`,
  },
  noMatchHint: {
    en: "Check the spelling, or search by city instead.",
    ne: "हिज्जे जाँच्नुहोस्, वा सहरको नामले खोज्नुहोस्।",
  },
  showAll: { en: "Show all centres", ne: "सबै केन्द्र देखाउनुहोस्" },
  call: { en: (name: string) => `Call ${name}`, ne: (name: string) => `${name} मा फोन गर्नुहोस्` },
  book: { en: "Book here", ne: "यहाँ बुक गर्नुहोस्" },
  bookAt: { en: (name: string) => `Book at ${name}`, ne: (name: string) => `${name} मा बुक गर्नुहोस्` },
}
