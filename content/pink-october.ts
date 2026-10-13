import type { Bilingual, SectionCopy } from "./types"

// October is Breast Cancer Awareness Month, and the pink ribbon is its symbol.

export const pinkOctober = {
  statement: { en: "October is Breast Cancer Awareness Month", ne: "अक्टोबर स्तन क्यान्सर सचेतना महिना हो" },
  month: { en: "October", ne: "अक्टोबर" },
  // runs round the seal on the hero photo
  seal: {
    en: "Breast Cancer Awareness Month · October · ",
    ne: "स्तन क्यान्सर सचेतना महिना · अक्टोबर · ",
  },
  // the Nepali is about half as long, so it goes round twice
  sealRepeat: { en: 1, ne: 2 },
} satisfies Record<string, Bilingual<string | number>>

export const pinkOctoberCopy: SectionCopy = {
  title: {
    en: { before: "Pink ", accent: "October", after: "." },
    ne: { before: "गुलाबी ", accent: "अक्टोबर", after: "।" },
  },
  lead: {
    en: "October is Breast Cancer Awareness Month. Around the world, the pink ribbon reminds women that breast cancer found early is easier to treat. Take one step for yourself this October, and help someone you love take theirs.",
    ne: "अक्टोबर स्तन क्यान्सर सचेतना महिना हो। संसारभर गुलाबी रिबनले स्तन क्यान्सर चाँडै पत्ता लागे उपचार सजिलो हुन्छ भन्ने सम्झाउँछ। यो अक्टोबरमा आफ्नै लागि एउटा कदम चाल्नुहोस्, र आफ्ना प्रियजनलाई पनि सघाउनुहोस्।",
  },
}

/** Three things to do this October. */
export const pinkOctoberSteps: {
  id: "book" | "check" | "remind"
  title: Bilingual
  text: Bilingual
  link: Bilingual
}[] = [
  {
    id: "book",
    title: { en: "Book your screening", ne: "आफ्नो स्क्रिनिङ बुक गर्नुहोस्" },
    text: { en: "Thirty minutes, with no radiation and no touch.", ne: "३० मिनेट मात्र, न विकिरण न स्पर्श।" },
    link: { en: "Book now", ne: "अहिले बुक गर्नुहोस्" },
  },
  {
    id: "check",
    title: { en: "Check yourself", ne: "आफैं जाँच्नुहोस्" },
    text: {
      en: "Know how your breasts normally look and feel, so a change stands out.",
      ne: "स्तन सामान्य अवस्थामा कस्तो देखिन्छ र छामिन्छ थाहा पाउनुहोस्, ताकि परिवर्तन तुरुन्तै थाहा होस्।",
    },
    link: { en: "See the warning signs", ne: "चेतावनी संकेत हेर्नुहोस्" },
  },
  {
    id: "remind",
    title: { en: "Remind someone you love", ne: "प्रियजनलाई सम्झाउनुहोस्" },
    text: {
      en: "Ask your mother, sister or a friend to book a screening too.",
      ne: "आमा, दिदीबहिनी वा साथीलाई पनि स्क्रिनिङ गराउन भन्नुहोस्।",
    },
    link: { en: "Find a centre near them", ne: "उहाँहरू नजिकको केन्द्र खोज्नुहोस्" },
  },
]
