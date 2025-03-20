'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import AccountProfile from '../components/AccountProfile'
import AccountSettings from '../components/AccountSettings'

export default function AccountPage() {
  return (
    <div className="overflow-y-auto">
      <div className="container mx-auto max-w-screen-lg py-8">
        <AccountProfile />
        <div className="my-12 border-b border-slate-800" />
        <AccountSettings />
      </div>
    </div>
  )
}
