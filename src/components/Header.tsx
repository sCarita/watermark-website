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
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
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
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label={t('accessibility.toggleNavigation')}
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 z-10 bg-slate-300/50 opacity-100 backdrop-blur" />
      <PopoverPanel className="absolute inset-x-0 top-full z-20 mt-4 origin-top rounded-2xl bg-white p-8 ring-1 ring-slate-900/5 opacity-100 ui-closed:opacity-0 ui-closed:scale-95">
        <div className="flex flex-col gap-y-4">
          <MobileNavLink href="#features">{t('common.navigation.features')}</MobileNavLink>
          <MobileNavLink href="#testimonials">{t('common.navigation.testimonials')}</MobileNavLink>
          <MobileNavLink href="#pricing">{t('common.navigation.pricing')}</MobileNavLink>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex justify-center mb-4">
            <LanguageSelector />
          </div>
          <Button href="/login" variant="outline">
            {t('common.navigation.signIn')}
          </Button>
          <Button href="/register">{t('common.navigation.getStarted')}</Button>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const { t } = useI18n()
  
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
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
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">{t('common.navigation.signIn')}</NavLink>
            </div>
            <LanguageSelector />
            <Button href="/register" color="blue">
              <span>
                {t('common.navigation.getStartedToday')}
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
