import { Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionIntro } from "@/components/common/section-intro"
import { faqs } from "@/content/faqs"
import { faqCopy } from "@/content/home"
import { site } from "@/content/site"
import { getI18n } from "@/i18n/server"

export async function Faq() {
  const { t } = await getI18n()
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIntro id="faq-title" copy={faqCopy} />
          <a
            href={`tel:${site.phone}`}
            className="mt-8 flex items-center gap-4 rounded-[1.75rem] bg-peach p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-rose shadow-soft">
              <Phone className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-mauve">{t(faqCopy.call)}</span>
              <span className="font-display text-xl font-semibold tabular-nums">{site.phone}</span>
            </span>
          </a>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f) => (
            <AccordionItem
              key={f.q.en}
              value={f.q.en}
              className="rounded-[1.75rem] border-0 bg-white px-6 shadow-soft not-last:border-b-0 sm:px-8"
            >
              <AccordionTrigger className="py-6 font-display text-xl font-semibold hover:no-underline">
                {t(f.q)}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-lg leading-relaxed text-mauve">{t(f.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
