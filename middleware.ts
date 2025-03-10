import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import i18nConfig from './next-i18next.config'

acceptLanguage.languages(i18nConfig.i18n.locales)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

const cookieName = 'i18nextLng'

export function middleware(req: NextRequest) {
  // Check if there is a cookie with the user's preferred language
  let lng: string = i18nConfig.i18n.defaultLocale

  if (req.cookies.has(cookieName)) {
    const cookieValue = req.cookies.get(cookieName)?.value
    if (cookieValue && i18nConfig.i18n.locales.includes(cookieValue)) {
      lng = cookieValue
    }
  } else {
    // If no cookie, try to get the preferred language from the Accept-Language header
    const acceptLangHeader = req.headers.get('Accept-Language')
    if (acceptLangHeader) {
      const acceptLng = acceptLanguage.get(acceptLangHeader)
      if (acceptLng) {
        lng = acceptLng
      }
    }
  }

  // Skip if the request is for a static asset or API route
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next()
  }

  // Create a response object
  const response = NextResponse.next()

  // Set the language cookie if it doesn't exist or is different
  if (
    !req.cookies.has(cookieName) ||
    req.cookies.get(cookieName)?.value !== lng
  ) {
    response.cookies.set(cookieName, lng)
  }

  return response
}
