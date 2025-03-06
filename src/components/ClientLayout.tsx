'use client'

import { useState, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieConsent from './CookieConsent'
import { cookieName } from '@/utils/coockiesConsent'

export default function ClientLayout() {
  const [showGA, setShowGA] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem(cookieName)
    if (storedConsent === 'true') {
      setShowGA(true)
    }
  }, [])

  const handleConsent = (consent: boolean) => {
    setShowGA(consent)
  }

  return (
    <>
      <CookieConsent onConsent={handleConsent} />
      {showGA && <GoogleAnalytics gaId="G-PT9T073PV4" />}
    </>
  )
}
