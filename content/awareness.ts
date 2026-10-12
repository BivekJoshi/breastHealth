import type { Bilingual, SectionCopy } from "./types"

export const awarenessCopy: SectionCopy & {
  signsLabel: Bilingual
  risksLabel: Bilingual
  talkToDoctor: Bilingual
} = {
  title: {
    en: { before: "Know your ", accent: "body", after: "." },
    ne: { before: "आफ्नो ", accent: "शरीर", after: " चिन्नुहोस्।" },
  },
  lead: {
    en: "Screening is one half of early detection. The other half is noticing changes and acting on them.",
    ne: "प्रारम्भिक पहिचानको आधा भाग स्क्रिनिङ हो। बाँकी आधा भाग शरीरमा आएका परिवर्तन ख्याल गर्नु र तुरुन्तै कदम चाल्नु हो।",
  },
  signsLabel: { en: "Warning signs", ne: "चेतावनी संकेतहरू" },
  risksLabel: { en: "Risk factors", ne: "जोखिम कारकहरू" },
  talkToDoctor: { en: "Talk to a doctor", ne: "चिकित्सकसँग कुरा गर्नुहोस्" },
}

// Nepali wording follows the Advance Breast Clinic awareness banners.
export const warningSigns: Bilingual[] = [
  { ne: "स्तन वा काखीमा गाँठो", en: "A lump in the breast or armpit" },
  { ne: "स्तनको कुनै भाग बाक्लो हुनु वा सुन्निनु", en: "Thickening or swelling of any part of the breast" },
  {
    ne: "स्तनको छालामा जलन, भित्र गाडिनु (डिम्पल) वा रातोपन",
    en: "Irritated, dimpled or reddened skin on the breast or nipple",
  },
  { ne: "निप्पलबाट रगत वा तरल पदार्थ बग्नु", en: "Blood or fluid coming from the nipple" },
]

export const riskFactors: Bilingual[] = [
  { ne: "ढिलो उमेरमा बच्चा जन्माउने", en: "First child later in life" },
  { ne: "स्तनपान नगराउने", en: "Not breastfeeding" },
  { ne: "मोटोपना", en: "Obesity" },
  { ne: "विकिरण", en: "Radiation exposure" },
  { ne: "वंशानुगत / आनुवंशिक कारकहरू", en: "Family history and genes" },
  { ne: "धुम्रपान तथा मद्यपान", en: "Smoking and alcohol" },
  { ne: "एस्ट्रोजेन हर्मोनको लामो समयसम्म सम्पर्क", en: "Long-term oestrogen exposure" },
]

export const seeADoctor: Bilingual = {
  ne: "स्तनमा केही परिवर्तन देखिए तुरुन्त चिकित्सकको परामर्श लिनुहोस्।",
  en: "Notice any change in your breast? See a doctor right away — don’t wait for a screening date.",
}

/**
 * Points on the home hero's body illustration, in the order the thermal
 * lens visits them. Positions live with the drawing (features/thermal-lens/torso.ts).
 */
export const bodyMap: {
  id: "symmetry" | "upperOuter" | "armpit" | "nipple"
  kicker: Bilingual
  title: Bilingual
  /** For the buttons that switch between points. */
  short: Bilingual
  text: Bilingual
}[] = [
  {
    id: "symmetry",
    kicker: { en: "How the AI reads it", ne: "एआईले कसरी पढ्छ" },
    title: { en: "Left and right", ne: "दायाँ र बायाँ" },
    short: { en: "Left & right", ne: "दायाँ–बायाँ" },
    text: {
      en: "Healthy breasts are usually close in temperature. AI compares both sides, so a warm patch on just one stands out.",
      ne: "स्वस्थ स्तनको तापक्रम प्रायः उस्तै हुन्छ। एआईले दुवैतर्फ तुलना गर्छ, त्यसैले एकातर्फ मात्र देखिने तातो भाग छुट्टै देखिन्छ।",
    },
  },
  {
    id: "upperOuter",
    kicker: { en: "Good to know", ne: "जान्नैपर्ने कुरा" },
    title: { en: "Upper-outer area", ne: "माथिल्लो बाहिरी भाग" },
    short: { en: "Upper-outer", ne: "माथिल्लो बाहिरी" },
    text: {
      en: "Nearly half of breast cancers start in this part of the breast, the area nearest the armpit.",
      ne: "स्तन क्यान्सरका झन्डै आधा केस स्तनको यही भागमा, काखीनजिकै सुरु हुन्छन्।",
    },
  },
  {
    id: "armpit",
    kicker: { en: "Check yourself", ne: "आफैं जाँच्नुहोस्" },
    title: { en: "Armpit", ne: "काखी" },
    short: { en: "Armpit", ne: "काखी" },
    text: {
      en: "Breast tissue reaches up into the armpit, and lymph nodes sit here. Feel for lumps here too.",
      ne: "स्तनको तन्तु काखीसम्म फैलिएको हुन्छ, र यहाँ लिम्फ नोडहरू हुन्छन्। यहाँ पनि गाँठो छ कि छामेर हेर्नुहोस्।",
    },
  },
  {
    id: "nipple",
    kicker: { en: "Warning signs", ne: "चेतावनी संकेत" },
    title: { en: "Nipple and skin", ne: "निप्पल र छाला" },
    short: { en: "Nipple", ne: "निप्पल" },
    text: {
      en: "See a doctor for fluid or blood, a nipple that turns inward, or skin that dimples or reddens.",
      ne: "निप्पलबाट तरल वा रगत आए, निप्पल भित्र पसे, वा छाला खाल्डो परे वा रातो भए चिकित्सकलाई देखाउनुहोस्।",
    },
  },
]

export const bodyMapCopy = {
  label: { en: "What a breast screening looks at", ne: "स्तन स्क्रिनिङमा के-के हेरिन्छ" },
  view: { en: "Thermal view", ne: "थर्मल दृश्य" },
  note: { en: "Illustration, not a real scan", ne: "चित्र मात्र, वास्तविक स्क्यान होइन" },
} satisfies Record<string, Bilingual>
