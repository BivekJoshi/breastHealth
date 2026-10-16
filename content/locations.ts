import type { SectionCopy } from "./types"

// Provinces, cities and centres are not listed here: they come from the API
// (GET /api/locations) and are managed on the admin page, /en/admin.

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
  loading: { en: "Loading centres…", ne: "केन्द्रहरू लोड हुँदैछन्…" },
  failed: { en: "We couldn’t load the centre list.", ne: "केन्द्रको सूची लोड गर्न सकिएन।" },
  failedHint: {
    en: "Check your connection and try again, or call us to book.",
    ne: "इन्टरनेट जडान जाँचेर फेरि प्रयास गर्नुहोस्, वा बुक गर्न हामीलाई फोन गर्नुहोस्।",
  },
  retry: { en: "Try again", ne: "फेरि प्रयास गर्नुहोस्" },
  empty: { en: "No centres are listed yet.", ne: "अहिलेसम्म कुनै केन्द्र सूचीमा छैन।" },
  emptyHint: {
    en: "New centres are opening soon. Until then, we can screen you at home.",
    ne: "नयाँ केन्द्रहरू छिट्टै खुल्दैछन्। त्यसबेलासम्म हामी तपाईंको घरमै स्क्रिनिङ गर्न सक्छौं।",
  },
  bookHome: { en: "Book a home visit", ne: "घरमै जाँच बुक गर्नुहोस्" },
}
