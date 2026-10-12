# BreastScan — AI thermal breast screening (frontend)

Frontend-only marketing site built with **Next.js 16 (App Router)**, **Tailwind CSS v4** and **shadcn/ui** (Radix).

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static site in out/
npx serve out          # preview it
```

## Deploy

Static export uploaded to cPanel over FTPS, like the Evolve frontend. Push to `PRODUCTION` → [deploy.yml](.github/workflows/deploy.yml) builds and mirrors `out/` into breastscan.health's document root; the secrets it needs are listed at the top of that file. Every other branch and PR only runs [ci.yml](.github/workflows/ci.yml) (lint + build).

```bash
git checkout PRODUCTION && git merge main && git push origin PRODUCTION
```

## Design

- **Mood:** soft, feminine and clean. Rounded cards, pill buttons, pastel sections (blush, lilac, peach), wavy section edges, and a few drifting petals and sparkles.
- **Signature:** the home hero pairs "Early detection brings peace of mind." with the photo in assets/HeroWomen.png and a thermal scan window over her chest (placed by `PHOTO_SCAN` in features/thermal-lens/scan-portrait.tsx). Point at the scan to read the temperature there; the scale card's marker follows. A sample "No abnormality detected" result links to how reports work. Nothing moves on its own.
- **Type:** Fredoka (headings) · Nunito (body) · Baloo 2 (Nepali; rounded to match, and it shapes `lang="ne"` correctly) · Dancing Script (one accent word per block, e.g. *heat*, *body*, *for yourself*).
- **Colour:** `paper`, `blush`, `petal`, `rose` (actions), `rose-deep`, `berry` (text), `mauve`, `lilac`, `lavender`, `peach`. The `heat-0…5` ramp is used only for heat.
- **Bilingual:** every section has a Nepali tag. Warning signs and risk factors use the clinic's own Nepali wording.

## Languages (English / नेपाली)

- Every page exists twice: `/en/...` and `/ne/...`, both prerendered. `proxy.ts` redirects any path without a locale: the visitor's saved choice (`NEXT_LOCALE` cookie, set by the switch) first, then the browser's `Accept-Language`, then English.
- The **switch** in the header (and mobile menu) keeps the current page and any `?city=` filter.
- All copy lives in `content/` as `{ en, ne }` pairs, so both languages of an item sit side by side. The current language is primary; the other one appears as the small secondary line (section tags, warning signs, city names).
- Server components: `const { t, alt, num, href } = await getI18n()` (`@/i18n/server`, built on `next/root-params`). Client components: `useI18n()` (`@/i18n/client`).
  - `t(x)` / `alt(x)` pick the current / other language, `num(n)` formats numbers (Devanagari digits in Nepali: ३० मिनेट, ३६.४°C), `href("/book")` adds the locale prefix.
- Each page sets its title and description per language, with `hreflang` alternates to the other one.
- `proxy.ts` only runs under `next dev`; the static export ignores it. In production `public/.htaccess` does the same redirect in Apache.

## Structure

```
proxy.ts                  locale redirect
i18n/                     config (locales, cookie), helpers, getI18n (server), useI18n (client), metadata
app/
  globals.css             palette tokens, shadcn mapping, thermal-lens CSS
  [lang]/
    layout.tsx            root layout: <html lang>, fonts, per-language metadata
    not-found.tsx         localized 404 (unknown paths reach it via [...rest])
    (site)/               route group sharing header + footer
      page.tsx            home — only composes sections
      screening/ locations/ book/
content/                  all copy and data as { en, ne }, typed (edit here, not in components)
  site.ts common.ts home.ts screening.ts awareness.ts faqs.ts locations.ts booking.ts types.ts
features/                 interactive pieces with their own logic
  thermal-lens/           hero lens: torso.ts (drawing + heat sources), heat.ts (temperature map), torso-figure.tsx,
                          body-map.tsx (points + card), use-thermal-lens.ts (rAF loop, tour); gurans-bloom.tsx for /screening
  locations/              directory.ts (pure filter/group helpers), finder UI, ?city= deep links
  booking/                form, ?centre= pre-selection
sections/                 page sections (server components)
  home/ screening/
components/
  ui/                     shadcn primitives (button has extra `xl`, `inverse` variants)
  brand/                  logo, flower geometry, doodles (sparkles, petals, wave edge, script word)
  layout/ common/
```

Each `*-from-url.tsx` wrapper reads search params inside `<Suspense>`. The fallback is the same component with default props, so the static HTML still contains the full centre list and the full form.

## Before going live

- Replace the **sample** phone numbers, email and the 13 centres in `content/site.ts` and `content/locations.ts`.
- Have a native speaker proofread the Nepali copy.
- The booking form only shows a confirmation; connect `onSubmit` in `features/booking/booking-form.tsx` to a backend.

## Note on Nepali rendering

Some fonts break Nepali shaping under `lang="ne"`: Eczar, for example, renders परामर्श as परामर्‌श. If you change fonts, check a word with a reph (परामर्श, स्पर्श) with `lang="ne"` set. Keep `lang="ne"` on Nepali text so screen readers use the right voice.
