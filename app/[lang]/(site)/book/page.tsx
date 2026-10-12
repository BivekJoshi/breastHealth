import { Suspense } from "react"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { PageIntro } from "@/components/common/page-intro"
import { bookingForm, bookingPage } from "@/content/booking"
import { paths, site } from "@/content/site"
import { BookingForm } from "@/features/booking/booking-form"
import { BookingFormFromUrl } from "@/features/booking/booking-form-from-url"
import { localizedMetadata } from "@/i18n/metadata"
import { getI18n } from "@/i18n/server"

export async function generateMetadata() {
  return localizedMetadata(paths.book, bookingPage.meta)
}

export default async function BookPage() {
  const { t, num } = await getI18n()
  const { labels } = bookingPage
  const contact = [
    { icon: Phone, label: t(labels.phone), value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, label: t(labels.email), value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: t(labels.mainCentre), value: t(site.address) },
    { icon: Clock, label: t(labels.hours), value: t(site.hours) },
  ]

  return (
    <>
      <PageIntro copy={bookingPage.intro} />

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:py-20 lg:grid-cols-[1fr_22rem] lg:gap-8">
        <section aria-label={t(bookingForm.region)} className="rounded-[2.5rem] bg-white p-6 shadow-soft sm:p-10">
          <Suspense fallback={<BookingForm />}>
            <BookingFormFromUrl />
          </Suspense>
        </section>

        <aside className="space-y-6">
          <section aria-labelledby="next" className="rounded-[2.25rem] bg-lilac p-7">
            <h2 id="next" className="font-display text-2xl font-semibold">
              {t(bookingPage.next)}
            </h2>
            <ol className="mt-5 space-y-4">
              {bookingPage.steps.map((s, i) => (
                <li key={s.title.en} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white font-display font-semibold text-lilac-deep shadow-sm">
                    {num(i + 1)}
                  </span>
                  <p className="pt-0.5 leading-snug">
                    <span className="font-extrabold">{t(s.title)}</span>{" "}
                    <span className="text-mauve">{t(s.text)}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="reach" className="rounded-[2.25rem] bg-blush p-7">
            <h2 id="reach" className="font-display text-2xl font-semibold">
              {t(bookingPage.talk)}
            </h2>
            <dl className="mt-5 space-y-4">
              {contact.map(({ icon: Icon, ...c }) => (
                <div key={c.label} className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-rose shadow-sm">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-sm font-bold text-mauve">{c.label}</dt>
                    <dd className="font-semibold">
                      {c.href ? (
                        <a href={c.href} className="wrap-break-word text-rose-deep hover:underline">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </>
  )
}
