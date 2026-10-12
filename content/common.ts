import type { Bilingual } from "./types"

// Interface copy shared across pages.
export const common = {
  book: { en: "Book a screening", ne: "स्क्रिनिङ बुक गर्नुहोस्" },
  openMenu: { en: "Open menu", ne: "मेनु खोल्नुहोस्" },
  home: { en: "home", ne: "गृहपृष्ठ" },
  language: { en: "Language", ne: "भाषा" },
  mainNav: { en: "Main", ne: "मुख्य" },

  footer: {
    visit: { en: "Visit us", ne: "हामीलाई भेट्नुहोस्" },
    pages: { en: "Pages", ne: "पृष्ठहरू" },
    madeIn: { en: "Made with care in Nepal", ne: "नेपालमा मायाले बनाइएको" },
    disclaimer: {
      en: "Screening is not a diagnosis. Always follow your doctor’s advice.",
      ne: "स्क्रिनिङ निदान होइन। सधैं चिकित्सकको सल्लाह मान्नुहोस्।",
    },
  },

  cta: {
    title: {
      en: { before: "Book thirty minutes ", accent: "for yourself" },
      ne: { before: "", accent: "आफ्नै लागि", after: " ३० मिनेट छुट्याउनुहोस्" },
    },
    // shown small, in the other language
    line: {
      en: "Set aside thirty minutes for yourself.",
      ne: "आफ्नै लागि ३० मिनेट छुट्याउनुहोस्।",
    },
  },

  notFound: {
    title: { en: "This page doesn’t exist.", ne: "यो पृष्ठ भेटिएन।" },
    text: {
      en: "The link may be old or mistyped. Start from the home page, or go straight to booking.",
      ne: "लिंक पुरानो वा गलत टाइप भएको हुन सक्छ। गृहपृष्ठबाट सुरु गर्नुहोस्, वा सिधै बुकिङमा जानुहोस्।",
    },
    home: { en: "Go to the home page", ne: "गृहपृष्ठमा जानुहोस्" },
  },
} satisfies Record<string, Bilingual | Record<string, Bilingual<unknown>>>
