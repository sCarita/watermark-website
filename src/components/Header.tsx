'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { useI18n } from '@/hooks/useI18n'
import { LanguageSelector } from '@/components/LanguageSelector'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full py-2 text-center text-sm font-medium text-slate-700 hover:text-blue-600">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 overflow-visible stroke-slate-700"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M6 6L18 18M18 6L6 18"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  const { t } = useI18n()
  
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white ui-not-focus-visible:outline-none"
        aria-label={t('accessibility.toggleNavigation')}
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 z-10 bg-slate-300/50 opacity-100 backdrop-blur" />
      <PopoverPanel className="absolute right-0 top-full z-20 mt-2 w-screen max-w-[320px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-slate-900/5 opacity-100 ui-closed:opacity-0 ui-closed:scale-95">
        <div className="p-4">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex justify-center mb-2">
              <LanguageSelector />
            </div>
          </div>
          
          <div className="py-3 border-b border-slate-200">
            <div className="space-y-1">
              <MobileNavLink href="#features">{t('common.navigation.features')}</MobileNavLink>
              <MobileNavLink href="#testimonials">{t('common.navigation.testimonials')}</MobileNavLink>
              <MobileNavLink href="#pricing">{t('common.navigation.pricing')}</MobileNavLink>
            </div>
          </div>
          
          <div className="pt-4 space-y-3">
            <Button href="/login" variant="outline" className="w-full justify-center text-sm">
              {t('common.navigation.signIn')}
            </Button>
            <Button href="/register" className="w-full justify-center text-sm">
              {t('common.navigation.getStarted')}
            </Button>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const { t } = useI18n()
  
  return (
    <header className="py-4 md:py-10">
      <Container>
        <nav className="relative z-50 flex items-center justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label={t('accessibility.home')}>
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">{t('common.navigation.features')}</NavLink>
              <NavLink href="#testimonials">{t('common.navigation.testimonials')}</NavLink>
              <NavLink href="#pricing">{t('common.navigation.pricing')}</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-3 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">{t('common.navigation.signIn')}</NavLink>
            </div>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden md:block">
              <Button href="/register" color="blue">
                <span>
                  {t('common.navigation.getStartedToday')}
                </span>
              </Button>
            </div>
            <div className="md:hidden">
              <div className="flex items-center gap-x-3">
                <LanguageSelector />
                <MobileNavigation />
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
