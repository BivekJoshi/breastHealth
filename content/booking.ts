import type { Bilingual, SectionCopy } from "./types"

export const bookingPage = {
  meta: {
    title: { en: "Book a screening", ne: "स्क्रिनिङ बुक गर्नुहोस्" },
    description: {
      en: "Request an AI thermal breast screening appointment at a centre near you, or at home.",
      ne: "नजिकको केन्द्रमा वा घरमै एआई थर्मल स्तन स्क्रिनिङको अपोइन्टमेन्ट अनुरोध गर्नुहोस्।",
    },
  },
  intro: {
    title: { en: "Book a screening.", ne: "स्क्रिनिङ बुक गर्नुहोस्।" },
    lead: {
      en: "Tell us how to reach you and where you’d like to be screened. We’ll call to confirm — there’s nothing to pay online.",
      ne: "तपाईंलाई कसरी सम्पर्क गर्ने र कहाँ स्क्रिनिङ गराउन चाहनुहुन्छ, बताउनुहोस्। हामी फोन गरेर पक्का गर्छौं — अनलाइन कुनै भुक्तानी गर्नुपर्दैन।",
    },
  } satisfies SectionCopy,
  next: { en: "What happens next", ne: "अब के हुन्छ" },
  steps: [
    { title: { en: "We call you", ne: "हामी फोन गर्छौं" }, text: { en: "to confirm a centre, date and time.", ne: "केन्द्र, मिति र समय पक्का गर्न।" } },
    { title: { en: "You visit", ne: "तपाईं आउनुहुन्छ" }, text: { en: "for about 30 minutes, mostly resting.", ne: "करिब ३० मिनेटका लागि, धेरैजसो आराममा।" } },
    {
      title: { en: "You get your report", ne: "तपाईंले रिपोर्ट पाउनुहुन्छ" },
      text: { en: "reviewed by a doctor within 1–2 working days.", ne: "चिकित्सकले हेरेर १–२ कार्यदिनभित्र।" },
    },
  ],
  talk: { en: "Prefer to talk?", ne: "कुरा गर्न चाहनुहुन्छ?" },
  labels: {
    phone: { en: "Phone", ne: "फोन" },
    email: { en: "Email", ne: "इमेल" },
    mainCentre: { en: "Main centre", ne: "मुख्य केन्द्र" },
    hours: { en: "Hours", ne: "समय" },
  },
}

export const bookingForm = {
  region: { en: "Appointment request", ne: "अपोइन्टमेन्ट अनुरोध" },
  name: { en: "Full name", ne: "पूरा नाम" },
  phone: { en: "Phone number", ne: "फोन नम्बर" },
  age: { en: "Age", ne: "उमेर" },
  date: { en: "Preferred date", ne: "रुचाइएको मिति" },
  optional: { en: "optional", ne: "ऐच्छिक" },
  where: { en: "Where would you like your screening?", ne: "कहाँ स्क्रिनिङ गराउन चाहनुहुन्छ?" },
  choose: { en: "Choose a centre", ne: "केन्द्र छान्नुहोस्" },
  atHome: { en: "At my home", ne: "मेरो घरमै" },
  message: { en: "Anything we should know?", ne: "हामीले थाहा पाउनुपर्ने केही छ?" },
  messageHint: {
    en: "Symptoms, questions, or a time of day that suits you",
    ne: "लक्षण, प्रश्न, वा तपाईंलाई मिल्ने समय",
  },
  submit: { en: "Request appointment", ne: "अपोइन्टमेन्ट अनुरोध गर्नुहोस्" },
  sending: { en: "Sending…", ne: "पठाउँदै…" },
  invalid: {
    en: "Please check the highlighted details and try again.",
    ne: "कृपया रातो देखिएका विवरण जाँचेर फेरि प्रयास गर्नुहोस्।",
  },
  pastDate: {
    en: "The preferred date has already passed — choose today or a later day.",
    ne: "रुचाइएको मिति बितिसकेको छ — आज वा पछिको दिन छान्नुहोस्।",
  },
  tooMany: {
    en: (phone) => `We’ve received several requests from this connection. Please call us on ${phone} instead.`,
    ne: (phone) => `यो जडानबाट धेरै अनुरोध आइसकेका छन्। कृपया ${phone} मा फोन गर्नुहोस्।`,
  } satisfies Bilingual<(phone: string) => string>,
  failed: {
    en: (phone) => `Your request could not be sent. Please try again, or call us on ${phone}.`,
    ne: (phone) => `तपाईंको अनुरोध पठाउन सकिएन। फेरि प्रयास गर्नुहोस्, वा ${phone} मा फोन गर्नुहोस्।`,
  } satisfies Bilingual<(phone: string) => string>,
  sentTitle: { en: "Appointment requested.", ne: "अपोइन्टमेन्ट अनुरोध पठाइयो।" },
  sentText: {
    en: (name, phone) => `Thank you, ${name}. We’ll call you on ${phone} to confirm a time.`,
    ne: (name, phone) => `धन्यवाद, ${name}। समय पक्का गर्न हामी ${phone} मा फोन गर्नेछौं।`,
  } satisfies Bilingual<(name: string, phone: string) => string>,
  again: { en: "Request another appointment", ne: "अर्को अपोइन्टमेन्ट अनुरोध गर्नुहोस्" },
}
