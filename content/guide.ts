import { paths } from "./site"
import type { Bilingual, SectionCopy } from "./types"

/*
 * The breast health guide: one page per question women search for, at
 * /<lang>/breast-health/<slug>. Have a doctor review each page, then add their
 * name as `reviewedBy` — it shows as a byline and tells Google who checked it.
 */

export type GuideSection = {
  heading: Bilingual
  /** Paragraphs. */
  text?: Bilingual[]
  list?: Bilingual[]
  /** Number the list, for steps. */
  ordered?: boolean
}

export type GuideArticle = {
  /** The URL segment, the same in both languages. */
  slug: string
  /** Phrased the way people search; the page's h1 and title. */
  title: Bilingual
  /** For links in tight spaces. */
  short: Bilingual
  /** The search snippet, and the card text on the guide page. */
  description: Bilingual
  lead: Bilingual
  sections: GuideSection[]
  /** The signs that mean "see a doctor" for this topic. */
  seeADoctor: Bilingual[]
  /** Overrides guideCopy.seeADoctor. */
  seeADoctorTitle?: Bilingual
  /** ISO date the content last changed. */
  updated: string
  /** "Dr Name, MD (Radiology)". */
  reviewedBy?: Bilingual
}

export const articlePath = (slug: string) => `${paths.guide}/${slug}`

export const guidePage = {
  meta: {
    title: {
      en: "Breast health guide: symptoms, self-checks and screening",
      ne: "स्तन स्वास्थ्य जानकारी: लक्षण, आफैं जाँच र स्क्रिनिङ",
    },
    description: {
      en: "Clear answers about breast health in English and Nepali: signs of breast cancer, breast lumps and pain, how to check your breasts, risk factors and screening tests.",
      ne: "स्तन स्वास्थ्यबारे नेपाली र अंग्रेजीमा सरल जानकारी: स्तन क्यान्सरका लक्षण, गाँठो र दुखाइ, आफैं स्तन जाँच्ने तरिका, जोखिम कारक र स्क्रिनिङ परीक्षण।",
    },
  },
  intro: {
    title: {
      en: { before: "Your breast ", accent: "health", after: " guide." },
      ne: { before: "स्तन ", accent: "स्वास्थ्य", after: " जानकारी।" },
    },
    lead: {
      en: "Plain answers to the questions women ask most: what’s normal, what to look out for, and when to see a doctor.",
      ne: "महिलाले धेरै सोध्ने प्रश्नका सरल उत्तर: के सामान्य हो, केमा ध्यान दिने, र कहिले चिकित्सककहाँ जाने।",
    },
  } satisfies SectionCopy,
}

export const guideCopy = {
  home: { en: "Home", ne: "गृहपृष्ठ" },
  back: { en: "Breast health guide", ne: "स्तन स्वास्थ्य जानकारी" },
  read: { en: "Read", ne: "पढ्नुहोस्" },
  learnMore: { en: "Read more:", ne: "थप पढ्नुहोस्:" },
  related: { en: "More on breast health", ne: "स्तन स्वास्थ्यबारे थप" },
  seeADoctor: { en: "See a doctor soon if", ne: "यस्तो भएमा छिट्टै चिकित्सककहाँ जानुहोस्" },
  disclaimer: {
    en: "This page is general information. It is not a diagnosis, and it does not replace advice from a qualified health worker.",
    ne: "यो पृष्ठ सामान्य जानकारी हो। यो निदान होइन, र योग्य स्वास्थ्यकर्मीको सल्लाहको विकल्प पनि होइन।",
  },
  updated: {
    en: (day: string, month: string, year: string) => `Updated ${day} ${month} ${year}`,
    ne: (day: string, month: string, year: string) => `अद्यावधिक: ${year} ${month} ${day}`,
  },
  months: {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ne: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"],
  },
  reviewedBy: {
    en: (name: string) => `Medically reviewed by ${name}`,
    ne: (name: string) => `चिकित्सकीय समीक्षा: ${name}`,
  },
}

export const articles: GuideArticle[] = [
  {
    slug: "breast-cancer-symptoms",
    title: { en: "Signs and symptoms of breast cancer", ne: "स्तन क्यान्सरका लक्षणहरू के-के हुन्?" },
    short: { en: "Signs of breast cancer", ne: "स्तन क्यान्सरका लक्षण" },
    description: {
      en: "The early signs of breast cancer: lumps, skin and nipple changes, swelling and other changes to look out for, and when to see a doctor.",
      ne: "स्तन क्यान्सरका प्रारम्भिक लक्षण: गाँठो, छाला र निप्पलमा परिवर्तन, सुन्निनु लगायत ध्यान दिनुपर्ने संकेत, र कहिले चिकित्सककहाँ जाने।",
    },
    lead: {
      en: "Breast cancer can show up as a change you can see or feel. Knowing the signs helps you act early, when treatment is usually simpler and more successful.",
      ne: "स्तन क्यान्सर देख्न वा छाम्न सकिने परिवर्तनका रूपमा देखा पर्न सक्छ। लक्षण चिन्नुभयो भने छिट्टै कदम चाल्न सकिन्छ, र छिट्टै पत्ता लागे उपचार प्रायः सजिलो र बढी सफल हुन्छ।",
    },
    sections: [
      {
        heading: { en: "Common signs", ne: "सामान्य लक्षणहरू" },
        list: [
          { en: "A new lump or thick area in the breast or armpit", ne: "स्तन वा काखीमा नयाँ गाँठो वा बाक्लो भाग" },
          { en: "A change in the size or shape of one breast", ne: "एउटा स्तनको आकार वा बनावटमा परिवर्तन" },
          {
            en: "Dimpled or puckered skin, sometimes like orange peel",
            ne: "छाला खुम्चिनु वा भित्र गाडिनु, कहिलेकाहीँ सुन्तलाको बोक्राजस्तो देखिनु",
          },
          {
            en: "Redness, a rash, flaking or thickening of the skin or nipple",
            ne: "स्तन वा निप्पलको छाला रातो हुनु, डाबर आउनु, पाप्रा उक्किनु वा बाक्लो हुनु",
          },
          { en: "A nipple that turns inward when it used to point out", ne: "पहिले बाहिर फर्किएको निप्पल भित्रतिर पस्नु" },
          {
            en: "Fluid or blood leaking from the nipple when you are not breastfeeding",
            ne: "स्तनपान नगराएको बेला निप्पलबाट तरल वा रगत बग्नु",
          },
          { en: "Swelling in the armpit or near the collarbone", ne: "काखी वा हँसुली हड्डी नजिक सुन्निनु" },
          { en: "Pain in one part of the breast that does not go away", ne: "स्तनको एउटै भागमा नजाने दुखाइ" },
        ],
      },
      {
        heading: { en: "Early breast cancer often has no symptoms", ne: "सुरुका चरणमा प्रायः कुनै लक्षण देखिँदैन" },
        text: [
          {
            en: "In its early stages, breast cancer may cause no pain and no lump you can feel. This is why screening matters even when you feel well.",
            ne: "सुरुका चरणमा स्तन क्यान्सरले दुखाइ नगर्न सक्छ, र छामेर थाहा पाउने गाँठो पनि नहुन सक्छ। त्यसैले स्वस्थ महसुस गरिरहँदा पनि स्क्रिनिङ महत्त्वपूर्ण हुन्छ।",
          },
        ],
      },
      {
        heading: { en: "Most changes are not cancer", ne: "धेरैजसो परिवर्तन क्यान्सर होइनन्" },
        text: [
          {
            en: "Breasts change with your monthly cycle, pregnancy, breastfeeding and age, and most lumps turn out to be harmless, such as cysts or fibroadenomas. But only a health worker can tell the difference, so get any new change checked rather than waiting.",
            ne: "महिनावारी, गर्भावस्था, स्तनपान र उमेरसँगै स्तनमा परिवर्तन आउँछ, र धेरैजसो गाँठो सिस्ट (तरल भरिएको थैली) वा फाइब्रोएडेनोमाजस्ता हानि नगर्ने खालका हुन्छन्। तर फरक छुट्याउन स्वास्थ्यकर्मीले मात्र सक्नुहुन्छ, त्यसैले नकुरी कुनै पनि नयाँ परिवर्तन जाँच गराउनुहोस्।",
          },
        ],
      },
      {
        heading: { en: "Men can get it too", ne: "पुरुषलाई पनि हुन सक्छ" },
        text: [
          {
            en: "Breast cancer is rare in men, but it does happen. A painless lump under or around the nipple is the most common sign.",
            ne: "पुरुषमा स्तन क्यान्सर दुर्लभ हुन्छ, तर हुन्छ। निप्पलमुनि वा वरपर नदुख्ने गाँठो यसको सबैभन्दा सामान्य लक्षण हो।",
          },
        ],
      },
    ],
    seeADoctor: [
      { en: "You find a new lump in your breast or armpit", ne: "स्तन वा काखीमा नयाँ गाँठो भेटिएमा" },
      { en: "The skin of your breast dimples, puckers or turns red", ne: "स्तनको छाला खुम्चिएमा, भित्र गाडिएमा वा रातो भएमा" },
      { en: "Your nipple changes shape or leaks blood", ne: "निप्पलको आकार फेरिएमा वा रगत बगेमा" },
      { en: "A change is still there after your next period", ne: "अर्को महिनावारीपछि पनि परिवर्तन नहटेमा" },
    ],
    updated: "2026-10-22",
  },
  {
    slug: "breast-lump",
    title: { en: "Found a lump in your breast? What to do next", ne: "स्तनमा गाँठो आएमा के गर्ने?" },
    short: { en: "Found a lump?", ne: "गाँठो आएमा के गर्ने" },
    description: {
      en: "Found a breast lump? Most are not cancer, but every new lump should be checked. What to do, which tests to expect and what to tell your doctor.",
      ne: "स्तनमा गाँठो भेटियो? धेरैजसो गाँठो क्यान्सर होइनन्, तर हरेक नयाँ गाँठो जाँच गराउनुपर्छ। के गर्ने, कस्ता परीक्षण हुन्छन् र चिकित्सकलाई के बताउने।",
    },
    lead: {
      en: "Finding a lump is frightening, but most breast lumps are not cancer. The important thing is not to wait: have it checked by a health worker soon.",
      ne: "स्तनमा गाँठो भेटिँदा डर लाग्नु स्वाभाविक हो, तर धेरैजसो गाँठो क्यान्सर होइनन्। मुख्य कुरा कुर्नु हुँदैन: छिट्टै स्वास्थ्यकर्मीलाई जँचाउनुहोस्।",
    },
    sections: [
      {
        heading: { en: "What to do, step by step", ne: "के गर्ने, क्रमैसँग" },
        ordered: true,
        list: [
          {
            en: "Stay calm. Note where the lump is, roughly how big it feels, and when you first noticed it.",
            ne: "नआत्तिनुहोस्। गाँठो कहाँ छ, कति ठूलो जस्तो लाग्छ र पहिलो पटक कहिले थाहा पाउनुभयो, टिपेर राख्नुहोस्।",
          },
          {
            en: "See a doctor or health worker as soon as you can. Don’t wait to see whether it goes away.",
            ne: "सकेसम्म छिट्टै चिकित्सक वा स्वास्थ्यकर्मीलाई देखाउनुहोस्। आफैं हराउँछ कि भनेर नकुर्नुहोस्।",
          },
          {
            en: "Tell them about your periods, any pregnancy or breastfeeding, and whether anyone in your family has had breast or ovarian cancer.",
            ne: "महिनावारी, गर्भावस्था वा स्तनपान, र परिवारमा कसैलाई स्तन वा डिम्बाशयको क्यान्सर भएको छ कि छैन, बताउनुहोस्।",
          },
          {
            en: "Have the tests your doctor recommends, and go back for your results.",
            ne: "चिकित्सकले सिफारिस गरेका परीक्षण गराउनुहोस्, र नतिजा लिन फेरि जानुहोस्।",
          },
        ],
      },
      {
        heading: { en: "What the doctor may check", ne: "चिकित्सकले के-के जाँच गर्न सक्नुहुन्छ" },
        list: [
          { en: "A breast examination by hand (clinical breast exam)", ne: "हातले स्तन जाँच (क्लिनिकल स्तन जाँच)" },
          {
            en: "An ultrasound, which uses sound waves. It is often the first test for younger women.",
            ne: "अल्ट्रासाउन्ड, जसमा ध्वनि तरंग प्रयोग हुन्छ। कम उमेरका महिलाका लागि यो प्रायः पहिलो परीक्षण हो।",
          },
          { en: "A mammogram, a low-dose X-ray of the breast", ne: "म्यामोग्राम, स्तनको कम मात्राको एक्स-रे" },
          {
            en: "A biopsy, where a small sample is taken with a needle. Only a biopsy can confirm whether a lump is cancer.",
            ne: "बायोप्सी, जसमा सुईले सानो नमुना लिइन्छ। गाँठो क्यान्सर हो वा होइन भनेर बायोप्सीले मात्र पक्का गर्न सक्छ।",
          },
        ],
      },
      {
        heading: { en: "Common causes that are not cancer", ne: "क्यान्सर नभएका सामान्य कारण" },
        list: [
          {
            en: "Cysts: small sacs of fluid, which can come and go with your cycle",
            ne: "सिस्ट: तरल भरिएका साना थैली, जुन महिनावारीसँगै आउने-जाने गर्न सक्छन्",
          },
          {
            en: "Fibroadenomas: smooth, firm lumps that move under the skin, common in younger women",
            ne: "फाइब्रोएडेनोमा: छालामुनि चल्ने चिप्लो, कडा गाँठो, कम उमेरका महिलामा सामान्य",
          },
          {
            en: "Lumpy, tender breasts before a period (fibrocystic changes)",
            ne: "महिनावारीअघि स्तन डल्लो-डल्लो र दुख्ने हुनु (फाइब्रोसिस्टिक परिवर्तन)",
          },
          {
            en: "An infection or a blocked milk duct while breastfeeding (mastitis)",
            ne: "स्तनपान गराउँदा संक्रमण वा दूधनली बन्द हुनु (म्यास्टाइटिस)",
          },
        ],
      },
      {
        heading: { en: "What not to do", ne: "के नगर्ने" },
        list: [
          {
            en: "Don’t massage the lump, or rub oils or herbal pastes on it, hoping it will go away.",
            ne: "गाँठो हराओस् भनेर मालिस नगर्नुहोस्, तेल वा जडीबुटीको लेप नलगाउनुहोस्।",
          },
          { en: "Don’t wait months to see whether it changes.", ne: "परिवर्तन हुन्छ कि भनेर महिनौंसम्म नकुर्नुहोस्।" },
          {
            en: "Don’t rely on a screening test for a lump you can feel. A lump needs a doctor’s examination and the tests they recommend.",
            ne: "छामेर थाहा हुने गाँठोका लागि स्क्रिनिङ परीक्षणमा मात्र भर नपर्नुहोस्। गाँठोलाई चिकित्सकको जाँच र उहाँले सिफारिस गरेका परीक्षण चाहिन्छ।",
          },
        ],
      },
    ],
    seeADoctorTitle: { en: "See a doctor urgently if", ne: "यस्तो भएमा तुरुन्त चिकित्सककहाँ जानुहोस्" },
    seeADoctor: [
      { en: "The lump is hard, fixed in place or growing", ne: "गाँठो कडा छ, एकै ठाउँमा अड्किएको छ वा बढ्दै छ" },
      { en: "The skin over it dimples or turns red", ne: "गाँठोमाथिको छाला खुम्चिएको वा रातो भएको छ" },
      { en: "You also have a lump in your armpit", ne: "काखीमा पनि गाँठो छ" },
      { en: "There is blood from your nipple", ne: "निप्पलबाट रगत आउँछ" },
      { en: "Your breast is red and painful and you have a fever", ne: "स्तन रातो भएर दुख्छ र ज्वरो पनि आउँछ" },
    ],
    updated: "2026-10-22",
  },
  {
    slug: "breast-self-exam",
    title: { en: "How to check your breasts at home", ne: "स्तन आफैं कसरी जाँच्ने?" },
    short: { en: "Self-check at home", ne: "आफैं जाँच्ने तरिका" },
    description: {
      en: "A simple monthly breast self-check in five steps: what to look for in the mirror, how to feel each breast, and what to do if something changes.",
      ne: "हरेक महिना आफैं स्तन जाँच्ने सजिलो तरिका, पाँच चरणमा: ऐनामा के हेर्ने, हरेक स्तन कसरी छाम्ने, र केही परिवर्तन देखिए के गर्ने।",
    },
    lead: {
      en: "Checking your breasts regularly helps you learn what is normal for you, so you notice changes early. It takes about five minutes a month.",
      ne: "नियमित रूपमा स्तन जाँच्दा तपाईंका लागि सामान्य के हो भन्ने थाहा हुन्छ, र परिवर्तन छिट्टै चाल पाउन सकिन्छ। महिनामा करिब पाँच मिनेट लाग्छ।",
    },
    sections: [
      {
        heading: { en: "When to check", ne: "कहिले जाँच्ने" },
        text: [
          {
            en: "Choose a day a few days after your period ends, when breasts are least tender. If you no longer have periods, pick the same date each month.",
            ne: "महिनावारी सकिएको केही दिनपछि जाँच्नुहोस्, जुन बेला स्तन कम दुख्ने हुन्छ। महिनावारी बन्द भइसकेको छ भने हरेक महिनाको एउटै तारिख छान्नुहोस्।",
          },
        ],
      },
      {
        heading: { en: "Five steps", ne: "पाँच चरण" },
        ordered: true,
        list: [
          {
            en: "Stand in front of a mirror with your arms at your sides. Check the size, shape and colour of both breasts, and look for dimpling, swelling or a nipple that has turned inward.",
            ne: "हात तल झारेर ऐनाअगाडि उभिनुहोस्। दुवै स्तनको आकार, बनावट र रङ हेर्नुहोस्, साथै छाला खुम्चिएको, सुन्निएको वा निप्पल भित्र पसेको छ कि हेर्नुहोस्।",
          },
          {
            en: "Raise your arms above your head and look for the same changes. Then press your hands on your hips to tighten your chest muscles, and look again.",
            ne: "दुवै हात टाउकोमाथि उठाएर फेरि उस्तै परिवर्तन हेर्नुहोस्। त्यसपछि छातीका मांसपेशी कस्सिने गरी दुवै हात कम्मरमा थिचेर फेरि हेर्नुहोस्।",
          },
          {
            en: "Lie down with a pillow under your right shoulder and your right arm behind your head. With the flat pads of the three middle fingers of your left hand, feel your right breast in small circles.",
            ne: "दायाँ काँधमुनि सिरानी राखेर र दायाँ हात टाउकोपछाडि राखेर पल्टिनुहोस्। देब्रे हातका बीचका तीन औंलाको टुप्पाको समतल भागले दायाँ स्तनलाई साना-साना घेरा बनाउँदै छाम्नुहोस्।",
          },
          {
            en: "Use light, then medium, then firm pressure, and cover the whole area: from the collarbone to below the breast, and from the armpit to the middle of the chest. Move up and down in lines so you don’t miss any part.",
            ne: "पहिले हल्का, त्यसपछि मध्यम र अनि कडा दबाब दिनुहोस्, र पूरै भाग छाम्नुहोस्: हँसुली हड्डीदेखि स्तनमुनिसम्म, र काखीदेखि छातीको बीचसम्म। कुनै भाग नछुटोस् भनेर माथि-तल पङ्क्तिमा सार्दै जानुहोस्।",
          },
          {
            en: "Feel your armpit for lumps, then repeat everything on the left side. You can also check standing up in the shower, where wet skin makes it easier.",
            ne: "काखीमा गाँठो छ कि छाम्नुहोस्, त्यसपछि देब्रेतर्फ पनि सबै दोहोर्‍याउनुहोस्। नुहाउँदा उभिएर पनि छाम्न सकिन्छ, भिजेको छालामा छाम्न सजिलो हुन्छ।",
          },
        ],
      },
      {
        heading: { en: "What is normal", ne: "के सामान्य हो" },
        text: [
          {
            en: "Many breasts feel lumpy or uneven, and one is often a little bigger than the other. A firm ridge along the bottom of the breast is also normal. What matters is a change from what is usual for you.",
            ne: "धेरैको स्तन डल्लो-डल्लो वा असमान लाग्छ, र एउटा स्तन अर्कोभन्दा अलि ठूलो हुनु सामान्य हो। स्तनको तल्लो भागमा कडा धर्सोजस्तो लाग्नु पनि सामान्य हो। महत्त्वपूर्ण कुरा भनेको तपाईंका लागि सामान्यभन्दा फरक परिवर्तन हो।",
          },
        ],
      },
      {
        heading: { en: "A self-check is not a screening test", ne: "आफैं जाँच्नु स्क्रिनिङको विकल्प होइन" },
        text: [
          {
            en: "Checking at home helps you spot changes, but it can miss small or deep ones. Keep up with the screening your doctor recommends as well.",
            ne: "घरमै जाँच्दा परिवर्तन चाल पाउन मद्दत गर्छ, तर साना वा भित्री परिवर्तन छुट्न सक्छन्। त्यसैले चिकित्सकले सिफारिस गरेको स्क्रिनिङ पनि नियमित गराउनुहोस्।",
          },
        ],
      },
    ],
    seeADoctor: [
      {
        en: "A new lump, or a thick area that feels different from the rest",
        ne: "नयाँ गाँठो, वा बाँकी भागभन्दा फरक लाग्ने बाक्लो भाग",
      },
      { en: "Dimpled or red skin, or a change in shape", ne: "छाला खुम्चिनु वा रातो हुनु, वा आकार फेरिनु" },
      { en: "A nipple that has turned inward, or bloody discharge", ne: "निप्पल भित्र पस्नु, वा रगत मिसिएको तरल आउनु" },
      { en: "A change that is still there after your next period", ne: "अर्को महिनावारीपछि पनि नहटेको परिवर्तन" },
    ],
    updated: "2026-10-22",
  },
  {
    slug: "breast-pain",
    title: { en: "Breast pain: common causes and when to see a doctor", ne: "स्तन किन दुख्छ? कारण र कहिले चिकित्सककहाँ जाने" },
    short: { en: "Breast pain", ne: "स्तन दुख्नु" },
    description: {
      en: "Breast pain is common and is rarely a sign of cancer. The usual causes, simple ways to ease it, and the signs that mean you should see a doctor.",
      ne: "स्तन दुख्नु सामान्य हो, र यो विरलै मात्र क्यान्सरको लक्षण हुन्छ। सामान्य कारण, दुखाइ कम गर्ने सजिला उपाय, र चिकित्सककहाँ जानुपर्ने संकेत।",
    },
    lead: {
      en: "Most women have breast pain at some point. On its own, pain is rarely a sign of breast cancer, but some kinds of pain are worth having checked.",
      ne: "धेरैजसो महिलाको स्तन कुनै न कुनै बेला दुख्छ। दुखाइ मात्र भएमा यो विरलै क्यान्सरको लक्षण हुन्छ, तर केही खालका दुखाइ भने जँचाउनु राम्रो हुन्छ।",
    },
    sections: [
      {
        heading: { en: "Pain that follows your cycle", ne: "महिनावारीसँग जोडिएको दुखाइ" },
        text: [
          {
            en: "This is the most common kind. Both breasts may feel heavy, swollen or tender in the days before a period, and get better once it starts. It is caused by normal hormone changes.",
            ne: "यो सबैभन्दा सामान्य प्रकार हो। महिनावारी हुनुअघिका दिनमा दुवै स्तन गह्रौं, सुन्निएको वा छुँदा दुख्ने हुन सक्छन्, र महिनावारी सुरु भएपछि ठीक हुन्छ। यो सामान्य हर्मोन परिवर्तनले हुन्छ।",
          },
        ],
      },
      {
        heading: { en: "Other common causes", ne: "अन्य सामान्य कारण" },
        list: [
          { en: "A bra that doesn’t fit or support you well", ne: "नमिल्ने वा राम्रो सहारा नदिने ब्रा" },
          {
            en: "Pregnancy and breastfeeding, including blocked ducts and infection (mastitis)",
            ne: "गर्भावस्था र स्तनपान, जसमा दूधनली बन्द हुनु र संक्रमण (म्यास्टाइटिस) पनि पर्छन्",
          },
          {
            en: "Strained chest muscles, or pain from the ribs that feels as if it is in the breast",
            ne: "छातीको मांसपेशी तन्किनु, वा करङबाट आएको तर स्तनमै दुखेजस्तो लाग्ने दुखाइ",
          },
          {
            en: "Some medicines, including hormonal contraception and hormone therapy",
            ne: "केही औषधि, जस्तै हर्मोनयुक्त परिवार नियोजनका साधन र हर्मोन थेरापी",
          },
          { en: "Cysts, which can be tender", ne: "सिस्ट, जुन छुँदा दुख्न सक्छन्" },
        ],
      },
      {
        heading: { en: "Ways to ease it", ne: "दुखाइ कम गर्ने उपाय" },
        list: [
          {
            en: "Wear a well-fitting, supportive bra, and a soft one at night if that helps",
            ne: "मिल्ने र राम्रो सहारा दिने ब्रा लगाउनुहोस्, आवश्यक लागे राति नरम ब्रा लगाउनुहोस्",
          },
          { en: "Use a warm or cool compress", ne: "तातो वा चिसो सेक लगाउनुहोस्" },
          {
            en: "Ask a pharmacist or doctor about a simple pain reliever",
            ne: "सामान्य दुखाइ कम गर्ने औषधिबारे औषधि पसल वा चिकित्सकसँग सोध्नुहोस्",
          },
          {
            en: "Note when the pain comes, to see whether it follows your cycle",
            ne: "दुखाइ महिनावारीसँग मेल खान्छ कि हेर्न, दुखाइ कहिले हुन्छ टिपोट गर्नुहोस्",
          },
        ],
      },
    ],
    seeADoctor: [
      {
        en: "The pain is in one spot and doesn’t go away after your period",
        ne: "दुखाइ एउटै ठाउँमा छ र महिनावारीपछि पनि जाँदैन",
      },
      {
        en: "You also feel a lump, or see changes to the skin or nipple",
        ne: "साथमा गाँठो छामिन्छ, वा छाला वा निप्पलमा परिवर्तन देखिन्छ",
      },
      { en: "Your breast is red, hot and swollen, or you have a fever", ne: "स्तन रातो, तातो र सुन्निएको छ, वा ज्वरो आएको छ" },
      { en: "The pain is new and you have been through menopause", ne: "महिनावारी बन्द भइसकेपछि नयाँ दुखाइ सुरु भएको छ" },
      {
        en: "The pain keeps you from sleeping or doing daily tasks",
        ne: "दुखाइले निद्रा वा दैनिक काममा बाधा पुर्‍याउँछ",
      },
    ],
    updated: "2026-10-22",
  },
  {
    slug: "breast-cancer-risk",
    title: {
      en: "Breast cancer risk factors, and how to lower your risk",
      ne: "स्तन क्यान्सरको जोखिम के-केले बढाउँछ, र कसरी घटाउने?",
    },
    short: { en: "Risk factors", ne: "जोखिम र रोकथाम" },
    description: {
      en: "What raises the risk of breast cancer, from age and family history to lifestyle, and practical steps that lower it, from staying active to breastfeeding.",
      ne: "उमेर, पारिवारिक इतिहासदेखि जीवनशैलीसम्म, स्तन क्यान्सरको जोखिम के-केले बढाउँछ, र सक्रिय रहनेदेखि स्तनपानसम्म, जोखिम घटाउने व्यावहारिक उपाय।",
    },
    lead: {
      en: "A risk factor makes breast cancer more likely, but it doesn’t mean you will get it. Many women who develop breast cancer have no risk factor other than being a woman and getting older.",
      ne: "जोखिम कारकले स्तन क्यान्सरको सम्भावना बढाउँछ, तर यसको अर्थ तपाईंलाई क्यान्सर हुन्छ भन्ने होइन। स्तन क्यान्सर हुने धेरै महिलामा महिला हुनु र उमेर बढ्नुबाहेक अरू कुनै जोखिम कारक हुँदैन।",
    },
    sections: [
      {
        heading: { en: "Things you can’t change", ne: "बदल्न नसकिने कारण" },
        list: [
          { en: "Getting older: risk rises with age", ne: "उमेर बढ्नु: उमेरसँगै जोखिम बढ्छ" },
          {
            en: "A mother, sister or daughter who has had breast or ovarian cancer",
            ne: "आमा, दिदीबहिनी वा छोरीलाई स्तन वा डिम्बाशयको क्यान्सर भएको",
          },
          { en: "Inherited gene changes, such as in BRCA1 or BRCA2", ne: "BRCA1 वा BRCA2 जस्ता जीनमा वंशाणुगत परिवर्तन" },
          {
            en: "Periods that started early (before 12) or menopause that came late (after 55)",
            ne: "सानै उमेरमा (१२ वर्षअघि) महिनावारी सुरु हुनु, वा ढिलो (५५ वर्षपछि) महिनावारी बन्द हुनु",
          },
          { en: "Dense breast tissue", ne: "बाक्लो स्तन तन्तु" },
          { en: "Radiation treatment to the chest at a young age", ne: "सानो उमेरमा छातीमा विकिरण उपचार गरिएको" },
        ],
      },
      {
        heading: { en: "Things that make a difference", ne: "फरक पार्न सकिने कुरा" },
        list: [
          {
            en: "Stay active: aim for at least 30 minutes of brisk walking, or similar, on most days",
            ne: "सक्रिय रहनुहोस्: धेरैजसो दिन कम्तीमा ३० मिनेट छिटो हिँड्ने वा यस्तै व्यायाम गर्नुहोस्",
          },
          {
            en: "Keep to a healthy weight, especially after menopause",
            ne: "स्वस्थ तौल कायम राख्नुहोस्, विशेषगरी महिनावारी बन्द भएपछि",
          },
          { en: "Avoid alcohol, or drink as little as possible", ne: "मद्यपान नगर्नुहोस्, वा सकेसम्म कम गर्नुहोस्" },
          { en: "Don’t smoke", ne: "धुम्रपान नगर्नुहोस्" },
          {
            en: "Breastfeed if you can: the longer in total, the more it protects",
            ne: "सक्नुहुन्छ भने स्तनपान गराउनुहोस्: जति लामो समय गराउनुहुन्छ, त्यति बढी सुरक्षा हुन्छ",
          },
          {
            en: "Talk to your doctor before taking hormone therapy after menopause",
            ne: "महिनावारी बन्द भएपछि हर्मोन थेरापी लिनुअघि चिकित्सकसँग सल्लाह लिनुहोस्",
          },
        ],
      },
      {
        heading: { en: "If breast cancer runs in your family", ne: "परिवारमा स्तन क्यान्सरको इतिहास छ भने" },
        text: [
          {
            en: "Tell your doctor who was affected and at what age. You may need to start screening earlier or be checked more often, and some families are offered genetic testing.",
            ne: "परिवारमा कसलाई र कुन उमेरमा क्यान्सर भएको थियो, चिकित्सकलाई बताउनुहोस्। तपाईंले सामान्यभन्दा पहिले वा बढी पटक स्क्रिनिङ गराउनुपर्ने हुन सक्छ, र कतिपय परिवारलाई आनुवंशिक परीक्षणको सल्लाह दिइन्छ।",
          },
        ],
      },
      {
        heading: { en: "Lower risk is not no risk", ne: "जोखिम कम हुनु भनेको जोखिम नहुनु होइन" },
        text: [
          {
            en: "Healthy habits lower your risk but can’t remove it. Knowing your body and getting screened are still the best ways to find breast cancer early.",
            ne: "स्वस्थ बानीले जोखिम घटाउँछ, तर पूरै हटाउन सक्दैन। आफ्नो शरीर चिन्नु र स्क्रिनिङ गराउनु नै स्तन क्यान्सर छिट्टै पत्ता लगाउने उत्तम उपाय हुन्।",
          },
        ],
      },
    ],
    seeADoctorTitle: { en: "Talk to a doctor about your risk if", ne: "यस्तो भएमा आफ्नो जोखिमबारे चिकित्सकसँग कुरा गर्नुहोस्" },
    seeADoctor: [
      {
        en: "Two or more close relatives have had breast or ovarian cancer",
        ne: "दुई वा बढी नजिकका नातेदारलाई स्तन वा डिम्बाशयको क्यान्सर भएको छ",
      },
      { en: "A close relative was diagnosed before the age of 50", ne: "नजिकको नातेदारलाई ५० वर्ष नपुग्दै क्यान्सर पत्ता लागेको थियो" },
      { en: "A man in your family has had breast cancer", ne: "परिवारका कुनै पुरुषलाई स्तन क्यान्सर भएको थियो" },
      { en: "You notice any change in your breasts", ne: "स्तनमा कुनै परिवर्तन देखिएको छ" },
    ],
    updated: "2026-10-22",
  },
  {
    slug: "breast-cancer-screening",
    title: {
      en: "Breast cancer screening tests: which one, and when?",
      ne: "स्तन क्यान्सर स्क्रिनिङ: कुन परीक्षण, कहिले गराउने?",
    },
    short: { en: "Screening tests", ne: "स्क्रिनिङ परीक्षण" },
    description: {
      en: "Mammogram, ultrasound, clinical breast exam and AI thermal imaging compared: what each test does, who it suits and when to start screening in Nepal.",
      ne: "म्यामोग्राम, अल्ट्रासाउन्ड, क्लिनिकल स्तन जाँच र एआई थर्मल इमेजिङको तुलना: हरेक परीक्षणले के गर्छ, कसका लागि उपयुक्त छ र नेपालमा कहिलेदेखि स्क्रिनिङ सुरु गर्ने।",
    },
    lead: {
      en: "Screening means checking for breast cancer before you have any symptoms. Different tests suit different ages and situations. Here is what each one does.",
      ne: "स्क्रिनिङ भनेको कुनै लक्षण देखिनुअघि नै स्तन क्यान्सर छ कि छैन जाँच्नु हो। फरक उमेर र अवस्थाका लागि फरक परीक्षण उपयुक्त हुन्छन्। हरेकले के गर्छ, यहाँ हेर्नुहोस्।",
    },
    sections: [
      {
        heading: { en: "Mammogram", ne: "म्यामोग्राम" },
        text: [
          {
            en: "A low-dose X-ray of the breast, and the standard screening test in most countries. The breast is pressed between two plates for a few seconds, which can be uncomfortable. Images are less clear in dense breasts, which are common in younger women.",
            ne: "स्तनको कम मात्राको एक्स-रे, जुन धेरैजसो देशमा स्क्रिनिङको मुख्य परीक्षण हो। केही सेकेन्डका लागि स्तनलाई दुई प्लेटबीच थिचिन्छ, जुन असहज हुन सक्छ। बाक्लो स्तनमा तस्बिर कम स्पष्ट हुन्छ, र कम उमेरका महिलामा बाक्लो स्तन सामान्य हो।",
          },
        ],
      },
      {
        heading: { en: "Ultrasound", ne: "अल्ट्रासाउन्ड" },
        text: [
          {
            en: "Uses sound waves, with no radiation. It is often used for younger women and dense breasts, and to look more closely at a lump or at something seen on another test.",
            ne: "ध्वनि तरंग प्रयोग हुन्छ, विकिरण हुँदैन। कम उमेरका महिला र बाक्लो स्तनका लागि, र गाँठो वा अर्को परीक्षणमा देखिएको कुरा नजिकबाट हेर्न प्रायः प्रयोग गरिन्छ।",
          },
        ],
      },
      {
        heading: { en: "Clinical breast exam", ne: "क्लिनिकल स्तन जाँच" },
        text: [
          {
            en: "A trained doctor or health worker examines your breasts and armpits by hand. It is quick, needs no equipment, and is worth asking for at your regular check-ups.",
            ne: "तालिमप्राप्त चिकित्सक वा स्वास्थ्यकर्मीले हातले स्तन र काखी जाँच गर्नुहुन्छ। यो छिटो हुन्छ, कुनै उपकरण चाहिँदैन, र नियमित स्वास्थ्य जाँचमा गराउनु राम्रो हुन्छ।",
          },
        ],
      },
      {
        heading: { en: "AI thermal imaging (Niramai Thermalytix)", ne: "एआई थर्मल इमेजिङ (Niramai Thermalytix)" },
        text: [
          {
            en: "A thermal camera records heat patterns on the breast, and AI analyses them. The test is contact-free and uses no ionising radiation. Its result alone cannot confirm whether you have breast cancer, and it does not replace tests your doctor recommends: if it finds something unusual, you are referred for further tests.",
            ne: "थर्मल क्यामेराले स्तनको ताप ढाँचा रेकर्ड गर्छ, र एआईले त्यसको विश्लेषण गर्छ। यो परीक्षण सम्पर्करहित र आयनीकरण विकिरणरहित हुन्छ। यसको नतिजाले मात्र स्तन क्यान्सर भएको वा नभएको निश्चित गर्दैन, र चिकित्सकले सिफारिस गरेका परीक्षणको विकल्प यो होइन: केही असामान्य देखिए थप परीक्षणका लागि पठाइन्छ।",
          },
        ],
      },
      {
        heading: { en: "A biopsy confirms the diagnosis", ne: "निदान बायोप्सीले पक्का गर्छ" },
        text: [
          {
            en: "Screening tests look for signs that need a closer look. If one finds something, a biopsy, a small tissue sample taken with a needle, is the only way to confirm whether it is cancer.",
            ne: "स्क्रिनिङ परीक्षणले थप जाँच चाहिने संकेत खोज्छ। केही भेटिए, सुईले तन्तुको सानो नमुना लिने परीक्षण, बायोप्सीले मात्र क्यान्सर हो वा होइन पक्का गर्न सक्छ।",
          },
        ],
      },
      {
        heading: { en: "When to start", ne: "कहिलेदेखि सुरु गर्ने" },
        list: [
          {
            en: "Guidelines differ between countries. Many advise a mammogram every one to two years from age 40 or 50, so ask your doctor what suits you.",
            ne: "देशअनुसार निर्देशिका फरक छन्। धेरैले ४० वा ५० वर्षदेखि हरेक एक-दुई वर्षमा म्यामोग्राम गराउन सुझाउँछन्, त्यसैले तपाईंका लागि के उपयुक्त हुन्छ, चिकित्सकसँग सोध्नुहोस्।",
          },
          {
            en: "If breast cancer runs in your family, you may need to start earlier.",
            ne: "परिवारमा स्तन क्यान्सरको इतिहास छ भने पहिले नै सुरु गर्नुपर्ने हुन सक्छ।",
          },
          {
            en: "At any age, learn what is normal for your breasts and report changes.",
            ne: "जुनसुकै उमेरमा पनि आफ्नो स्तनका लागि सामान्य के हो जान्नुहोस्, र परिवर्तन देखिए स्वास्थ्यकर्मीलाई बताउनुहोस्।",
          },
          {
            en: "If you have symptoms, don’t wait for a screening appointment: see a doctor for a check-up instead.",
            ne: "लक्षण देखिएको छ भने स्क्रिनिङको पालो नकुर्नुहोस्: बरु जाँचका लागि चिकित्सककहाँ जानुहोस्।",
          },
        ],
      },
    ],
    seeADoctor: [
      {
        en: "You have a lump, a skin or nipple change, or pain in one spot",
        ne: "गाँठो, छाला वा निप्पलमा परिवर्तन, वा एउटै ठाउँमा दुखाइ छ",
      },
      { en: "A screening result says something needs a closer look", ne: "स्क्रिनिङ नतिजामा थप जाँच चाहिने भनिएको छ" },
      { en: "Breast or ovarian cancer runs in your family", ne: "परिवारमा स्तन वा डिम्बाशयको क्यान्सरको इतिहास छ" },
    ],
    updated: "2026-10-22",
  },
]
