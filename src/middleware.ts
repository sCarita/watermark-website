import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'es', 'fr']
const defaultLocale = 'en'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  // Check if there is a cookie with a preferred locale
  const cookieLocale = request.cookies.get('i18nextLng')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check for Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const parsedLocales = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim())
    const matchedLocale = parsedLocales.find((l) => {
      const locale = l.toLowerCase().substring(0, 2)
      return locales.includes(locale)
    })
    if (matchedLocale) {
      return matchedLocale.toLowerCase().substring(0, 2)
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)

  // e.g. incoming request is /products
  // The new URL is now /es/products
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
      request.url,
    ),
  )
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|images|sitemap.xml).*)',
  ],
}
