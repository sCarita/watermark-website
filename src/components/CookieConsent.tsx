'use client'

import { Button } from '@/components/Button'
import { cookieName } from '@/utils/coockiesConsent'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const CookieConsent = ({
  onConsent,
}: {
  onConsent: (consent: boolean) => void
}) => {
  const t = useTranslations()

  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(cookieName)
    if (!hasConsent) {
      setShowConsent(true)
    } else {
      // If we already have consent stored, inform the parent component
      onConsent(hasConsent === 'true')
    }
  }, [onConsent])

  const acceptCookies = () => {
    localStorage.setItem(cookieName, 'true')
    setShowConsent(false)
    onConsent(true)
  }

  const declineCookies = () => {
    localStorage.setItem(cookieName, 'false')
    setShowConsent(false)
    onConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed right-3 bottom-3 left-3 z-20 rounded-xl bg-slate-900 p-2 shadow-lg sm:p-3">
      <div className="flex flex-col items-center justify-between gap-1 sm:flex-row">
        <div className="mb-3 flex items-center gap-1.5 sm:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 48 48"
            className="shrink-0"
          >
            <circle cx={24} cy={24} r={21} fill="#155dfc"></circle>
            <path fill="#fff" d="M22 22h4v11h-4z"></path>
            <circle cx={24} cy={16.5} r={2.5} fill="#fff"></circle>
          </svg>
          <p className="text-sm text-white">
            {t('common.cookieConsent.message')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={acceptCookies}
            className="px-0 py-0 leading-none text-white"
            color="blue"
          >
            {t('common.cookieConsent.accept')}
          </Button>
          <Button
            onClick={declineCookies}
            className="px-0 py-0 leading-none text-white"
          >
            {t('common.cookieConsent.decline')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
