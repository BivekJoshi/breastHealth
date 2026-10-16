import type { Bilingual, SectionCopy } from "./types"

// The posts themselves are not here: they come from the API (GET /api/news)
// and are written on the admin page, /en/admin#news.

export const newsPage = {
  meta: {
    title: { en: "News", ne: "समाचार" },
    description: {
      en: "Screening camps, new centres and breast-health updates from BreastScan Nepal.",
      ne: "BreastScan नेपालका स्क्रिनिङ शिविर, नयाँ केन्द्र र स्तन स्वास्थ्यसम्बन्धी जानकारी।",
    },
  },
  intro: {
    title: { en: "News and updates.", ne: "समाचार र जानकारी।" },
    lead: {
      en: "Screening camps, new centres, and what’s happening across the network.",
      ne: "स्क्रिनिङ शिविर, नयाँ केन्द्र, र नेटवर्कभर भइरहेका गतिविधि।",
    },
  } satisfies SectionCopy,
}

export const newsCopy = {
  loading: { en: "Loading news…", ne: "समाचार लोड हुँदैछ…" },
  failed: { en: "The news could not be loaded.", ne: "समाचार लोड हुन सकेन।" },
  retry: { en: "Try again", ne: "फेरि प्रयास गर्नुहोस्" },
  empty: { en: "No news yet — check back soon.", ne: "अहिलेसम्म कुनै समाचार छैन — छिट्टै फेरि हेर्नुहोस्।" },
  readMore: { en: "Read more", ne: "थप पढ्नुहोस्" },
  back: { en: "All news", ne: "सबै समाचार" },
  missing: {
    en: "This post is no longer available.",
    ne: "यो समाचार अब उपलब्ध छैन।",
  },
} satisfies Record<string, Bilingual>
