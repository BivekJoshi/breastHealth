import type { Bilingual, SectionCopy } from "./types"

/** The three things people worry about most, answered up front. */
export const promises: { id: "radiation" | "touch" | "pain"; title: Bilingual; detail: Bilingual }[] = [
  {
    id: "radiation",
    title: { en: "No radiation.", ne: "विकिरण रहित।" },
    detail: {
      en: "The camera only receives the heat your body already gives off. Nothing is sent into you, so the test is safe to repeat.",
      ne: "क्यामेराले तपाईंको शरीरले स्वाभाविक रूपमा निकाल्ने ताप मात्र लिन्छ। शरीरभित्र केही पठाइँदैन, त्यसैले यो परीक्षण बारम्बार गर्न सुरक्षित छ।",
    },
  },
  {
    id: "touch",
    title: { en: "No touch.", ne: "स्पर्श रहित।" },
    detail: {
      en: "Nobody touches you and nothing presses on you. The technician works the camera from behind a screen.",
      ne: "कसैले तपाईंलाई छुँदैन, केही पनि थिचिँदैन। प्राविधिकले पर्दा पछाडिबाट क्यामेरा चलाउनुहुन्छ।",
    },
  },
  {
    id: "pain",
    title: { en: "No pain.", ne: "पीडा रहित।" },
    detail: {
      en: "No compression, no needles, no gel. You sit still for a few minutes while the images are taken.",
      ne: "न थिचाइ, न सुई, न जेल। तस्बिर लिँदा केही मिनेट स्थिर बसे पुग्छ।",
    },
  },
]

/** A visit, in real minutes. Bar widths in the timeline come from `minutes`. */
export const visit = {
  totalMinutes: 30,
  stages: [
    {
      start: 0,
      minutes: 5,
      title: { en: "Check in and change", ne: "दर्ता र लुगा फेर्ने" },
      text: { en: "Change into a gown in a private room.", ne: "निजी कोठामा गाउन लगाउनुहोस्।" },
    },
    {
      start: 5,
      minutes: 15,
      title: { en: "Rest and cool down", ne: "आराम र ताप सन्तुलन" },
      text: {
        en: "Sit in a cool room so your skin temperature settles. This is what makes the reading accurate.",
        ne: "चिसो कोठामा बस्नुहोस् ताकि छालाको तापक्रम स्थिर होस्। यसैले नतिजा सही आउँछ।",
      },
    },
    {
      start: 20,
      minutes: 10,
      title: { en: "Thermal capture", ne: "थर्मल तस्बिर" },
      text: {
        en: "The camera takes five images from different angles while you sit still.",
        ne: "तपाईं स्थिर बस्दा क्यामेराले फरक-फरक कोणबाट पाँचवटा तस्बिर लिन्छ।",
      },
    },
  ],
  finish: {
    title: { en: "Done", ne: "सकियो" },
    text: {
      en: "A doctor reviews your AI report. It is ready in 1–2 working days.",
      ne: "चिकित्सकले तपाईंको एआई रिपोर्ट हेर्नुहुन्छ। रिपोर्ट १–२ कार्यदिनमा तयार हुन्छ।",
    },
  },
}

/** Age ranges drawn on a shared axis. */
export const ages = {
  min: 18,
  max: 85,
  ticks: [18, 30, 40, 50, 60, 70, 80],
  ranges: [
    {
      label: { en: "AI thermal screening", ne: "एआई थर्मल स्क्रिनिङ" },
      note: { en: "18 to 80+, any breast density", ne: "१८ देखि ८०+, जुनसुकै स्तन घनत्व" },
      from: 18,
      to: 85,
      emphasis: true,
    },
    {
      label: { en: "Routine mammography", ne: "नियमित म्यामोग्राफी" },
      note: { en: "usually offered from 40", ne: "प्रायः ४० वर्षदेखि" },
      from: 40,
      to: 85,
      emphasis: false,
    },
  ],
}

export const pipelineCopy: SectionCopy & { view: Bilingual<(n: string, of: string) => string> } = {
  title: { en: "From heat to a report.", ne: "तापबाट रिपोर्टसम्म।" },
  lead: {
    en: "A growing tumour needs extra blood supply, which warms the tissue around it. Thermal screening picks up those small temperature differences — often before a lump can be felt.",
    ne: "बढ्दै गरेको ट्युमरलाई थप रक्तसञ्चार चाहिन्छ, जसले वरपरको तन्तुलाई तताउँछ। थर्मल स्क्रिनिङले तापक्रमका यस्ता साना भिन्नता पत्ता लगाउँछ — प्रायः गाँठो छामेर थाहा हुनुअघि नै।",
  },
  view: { en: (n, of) => `View ${n} of ${of}`, ne: (n, of) => `दृश्य ${n} / ${of}` },
}

/** How a thermal image becomes a report. */
export const pipeline: { title: Bilingual; text: Bilingual }[] = [
  {
    title: { en: "Capture", ne: "तस्बिर" },
    text: {
      en: "A medical thermal camera records five views of the chest. It only receives heat — it sends nothing out.",
      ne: "मेडिकल थर्मल क्यामेराले छातीका पाँचवटा दृश्य लिन्छ। यसले ताप मात्र लिन्छ — केही पनि बाहिर पठाउँदैन।",
    },
  },
  {
    title: { en: "Map", ne: "तापक्रम नक्सा" },
    text: {
      en: "Each image becomes a temperature map made of thousands of points, each accurate to a fraction of a degree.",
      ne: "हरेक तस्बिर हजारौं बिन्दु भएको तापक्रम नक्सामा बदलिन्छ, जुन डिग्रीको सानो अंशसम्म सही हुन्छ।",
    },
  },
  {
    title: { en: "Read", ne: "विश्लेषण" },
    text: {
      en: "AI looks for unusual heat and blood-vessel patterns. A doctor then reviews the result and explains it to you.",
      ne: "एआईले असामान्य ताप र रक्तनलीका ढाँचा खोज्छ। त्यसपछि चिकित्सकले नतिजा हेरेर तपाईंलाई बुझाउनुहुन्छ।",
    },
  },
]

export const comparisonCopy: SectionCopy & {
  feature: Bilingual
  thermal: Bilingual
  mammography: Bilingual
  yes: Bilingual
  no: Bilingual
} = {
  title: { en: "How it compares with mammography.", ne: "म्यामोग्राफीसँग तुलना।" },
  lead: {
    en: "Thermal screening isn’t a replacement for mammography. It is a gentler first step that more women can take — and if anything looks unusual, mammography or ultrasound confirms it.",
    ne: "थर्मल स्क्रिनिङ म्यामोग्राफीको विकल्प होइन। यो धेरै महिलाले सजिलै लिन सक्ने कोमल पहिलो कदम हो — केही असामान्य देखिए म्यामोग्राफी वा अल्ट्रासाउन्डले पुष्टि गर्छ।",
  },
  feature: { en: "Feature", ne: "विशेषता" },
  thermal: { en: "AI thermal", ne: "एआई थर्मल" },
  mammography: { en: "Mammography", ne: "म्यामोग्राफी" },
  yes: { en: "Yes", ne: "हो" },
  no: { en: "No", ne: "होइन" },
}

export const comparison: { label: Bilingual; thermal: boolean; mammography: boolean }[] = [
  { label: { en: "Uses no radiation", ne: "विकिरण प्रयोग हुँदैन" }, thermal: true, mammography: false },
  { label: { en: "No touch or compression", ne: "न स्पर्श, न थिचाइ" }, thermal: true, mammography: false },
  { label: { en: "Painless", ne: "पीडारहित" }, thermal: true, mammography: false },
  { label: { en: "Suitable for women under 40", ne: "४० वर्षमुनिका महिलाका लागि उपयुक्त" }, thermal: true, mammography: false },
  { label: { en: "Not affected by breast density", ne: "स्तन घनत्वले असर गर्दैन" }, thermal: true, mammography: false },
  { label: { en: "Portable for camps and workplaces", ne: "शिविर र कार्यस्थलमा लैजान मिल्ने" }, thermal: true, mammography: false },
]

export const eligibility = {
  title: { en: "Who should get screened", ne: "कसले स्क्रिनिङ गराउने" },
  items: [
    { en: "Women aged 18 to 80+, whatever their breast density", ne: "१८ देखि ८०+ वर्षका महिला, स्तन घनत्व जस्तोसुकै भए पनि" },
    { en: "Younger women, for whom mammography is not usually offered", ne: "कम उमेरका महिला, जसलाई प्रायः म्यामोग्राफी गरिँदैन" },
    { en: "Anyone with a family history of breast or ovarian cancer", ne: "परिवारमा स्तन वा डिम्बाशयको क्यान्सरको इतिहास भएका जो कोही" },
    { en: "Anyone who would rather not be touched or exposed to radiation", ne: "स्पर्श वा विकिरणबाट बच्न चाहने जो कोही" },
  ] satisfies Bilingual[],
}

export const preparation = {
  title: { en: "On the day of your test", ne: "परीक्षणको दिन" },
  items: [
    { en: "Skip deodorant, powder, lotion and oil on your chest and underarms.", ne: "छाती र काखीमा डिओडोरेन्ट, पाउडर, लोसन वा तेल नलगाउनुहोस्।" },
    { en: "Avoid exercise, hot showers and caffeine for 2 hours before your visit.", ne: "परीक्षणअघि २ घण्टासम्म व्यायाम, तातो पानीले नुहाउने र क्याफिन नलिनुहोस्।" },
    { en: "Wear a two-piece outfit so changing into a gown is easy.", ne: "गाउन फेर्न सजिलो होस् भनेर दुई भागको लुगा लगाउनुहोस्।" },
    { en: "If you can, book a day outside your menstrual period.", ne: "सकेसम्म महिनावारी नभएको दिन बुक गर्नुहोस्।" },
  ] satisfies Bilingual[],
}

export const screeningPage = {
  meta: {
    title: { en: "Thermal breast cancer screening: how it works", ne: "थर्मल स्तन क्यान्सर स्क्रिनिङ कसरी काम गर्छ" },
    description: {
      en: "How AI thermal breast cancer screening works in Nepal, how it compares with mammography, who should get screened and how to prepare.",
      ne: "नेपालमा एआई थर्मल स्तन क्यान्सर स्क्रिनिङ कसरी काम गर्छ, म्यामोग्राफीसँग कस्तो फरक छ, कसले गराउने र कसरी तयारी गर्ने।",
    },
  },
  intro: {
    title: { en: "How thermal screening works.", ne: "थर्मल स्क्रिनिङ कसरी काम गर्छ?" },
    lead: {
      en: "A low-cost, portable test that uses a thermal camera and artificial intelligence to find early signs of breast cancer — with nothing touching you and nothing entering your body.",
      ne: "थर्मल क्यामेरा र कृत्रिम बौद्धिकता प्रयोग गरेर स्तन क्यान्सरका प्रारम्भिक संकेत पत्ता लगाउने कम खर्चिलो र बोक्न मिल्ने परीक्षण — तपाईंलाई कसैले नछोई, शरीरभित्र केही नपठाई।",
    },
  } satisfies SectionCopy,
}
