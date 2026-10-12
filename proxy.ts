import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config"

/** Picks Nepali if the browser lists it before English, otherwise the default. */
function fromAcceptLanguage(header: string | null): Locale {
  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  const match = ranked.find((r) => isLocale(r.lang))?.lang
  return isLocale(match) ? match : defaultLocale
}

/**
 * Every page lives under /en or /ne. Requests without a locale are redirected:
 * the visitor's saved choice first, then their browser language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isLocale(pathname.split("/")[1])) return

  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(saved) ? saved : fromAcceptLanguage(request.headers.get("accept-language"))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals and any file with an extension (favicon, images, …).
  matcher: ["/((?!_next/|.*\\..*).*)"],
}
