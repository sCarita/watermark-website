'use client'

import { Button } from '@/components/Button'
import { cookieName } from '@/utils/coockiesConsent'
import { useState, useEffect } from 'react'
import { useI18n } from '@/hooks/useI18n'

const CookieConsent = ({
  onConsent,
}: {
  onConsent: (consent: boolean) => void
}) => {
  const { t } = useI18n()

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
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-3 text-center text-sm text-white sm:mb-0 sm:text-left">
          {t('common.cookieConsent.message')}
        </p>
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
