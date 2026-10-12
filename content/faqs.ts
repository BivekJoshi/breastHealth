import type { Bilingual } from "./types"

export const faqs: { q: Bilingual; a: Bilingual }[] = [
  {
    q: { en: "What is AI thermal breast screening?", ne: "एआई थर्मल स्तन स्क्रिनिङ के हो?" },
    a: {
      en: "A thermal camera maps the temperature of the breast surface. Areas with unusual blood flow — which can be an early sign of a tumour — show up as heat patterns, and AI analyses those patterns to flag anything that needs a closer look.",
      ne: "थर्मल क्यामेराले स्तनको सतहको तापक्रमको नक्सा बनाउँछ। असामान्य रक्तप्रवाह भएका भाग — जुन ट्युमरको प्रारम्भिक संकेत हुन सक्छ — ताप ढाँचाका रूपमा देखिन्छन्, र एआईले ती ढाँचा विश्लेषण गरेर थप जाँच चाहिने भए जनाउँछ।",
    },
  },
  {
    q: { en: "Is it safe? Does it use radiation?", ne: "के यो सुरक्षित छ? यसमा विकिरण प्रयोग हुन्छ?" },
    a: {
      en: "It uses no radiation at all. The camera only reads the heat your body already gives off, so you can repeat the test as often as your doctor recommends.",
      ne: "यसमा कुनै विकिरण प्रयोग हुँदैन। क्यामेराले तपाईंको शरीरले निकालिरहेको ताप मात्र पढ्छ, त्यसैले चिकित्सकले भनेअनुसार जति पटक पनि फेरि गर्न सकिन्छ।",
    },
  },
  {
    q: { en: "Will anyone touch me or see me?", ne: "के मलाई कसैले छुन्छ वा हेर्छ?" },
    a: {
      en: "No. The test is contactless and the technician operates the camera from behind a screen.",
      ne: "छुँदैन। परीक्षण पूर्ण रूपमा स्पर्शरहित हुन्छ र प्राविधिकले पर्दा पछाडिबाट क्यामेरा चलाउनुहुन्छ।",
    },
  },
  {
    q: { en: "Who should get screened?", ne: "कसले स्क्रिनिङ गराउनुपर्छ?" },
    a: {
      en: "Any woman aged 18 or older — including younger women and women with dense breasts, for whom mammography is less effective. If breast cancer runs in your family, screen regularly.",
      ne: "१८ वर्ष वा सोभन्दा माथिका सबै महिला — कम उमेरका र बाक्लो स्तन भएका महिलासहित, जसका लागि म्यामोग्राफी कम प्रभावकारी हुन्छ। परिवारमा स्तन क्यान्सरको इतिहास छ भने नियमित स्क्रिनिङ गराउनुहोस्।",
    },
  },
  {
    q: { en: "How long does it take, and when do I get my report?", ne: "कति समय लाग्छ, र रिपोर्ट कहिले पाइन्छ?" },
    a: {
      en: "About 30 minutes, most of it resting so your skin temperature settles. Your report is ready in 1–2 working days.",
      ne: "करिब ३० मिनेट, जसको धेरैजसो समय छालाको तापक्रम स्थिर हुन आराममा बित्छ। रिपोर्ट १–२ कार्यदिनमा तयार हुन्छ।",
    },
  },
  {
    q: { en: "Does this replace a mammogram?", ne: "के यसले म्यामोग्रामको ठाउँ लिन्छ?" },
    a: {
      en: "No. It is a screening test, not a diagnosis. If your report shows something unusual, your doctor will recommend a mammogram, ultrasound or biopsy to confirm.",
      ne: "लिँदैन। यो स्क्रिनिङ परीक्षण हो, निदान होइन। रिपोर्टमा केही असामान्य देखिए पुष्टिका लागि चिकित्सकले म्यामोग्राम, अल्ट्रासाउन्ड वा बायोप्सी सिफारिस गर्नुहुन्छ।",
    },
  },
]
