'use client'

import { Link } from '@/i18n/navigation'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { useTranslations } from 'next-intl'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { UserDropdown } from '@/components/UserDropdown'
import { Loader2 } from 'lucide-react'

function UserMenu() {
  const t = useTranslations()
  const { user, loading } = useAuth()

  if (loading) {
    return
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-x-4">
          <UserDropdown />
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <Button asChild variant="outline" color="slate">
            <Link href="/login">{t('common.signIn')}</Link>
          </Button>
          <Button asChild color="blue">
            <Link href="/register">
              {t('common.navigation.getStartedToday')}
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton
      as={Link}
      href={href}
      className="block w-full py-2 text-center text-sm font-medium text-slate-700 hover:text-blue-600"
    >
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
  const t = useTranslations()

  return (
    <Popover>
      <PopoverButton
        className="ui-not-focus-visible:outline-none relative z-10 flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white"
        aria-label={t('accessibility.toggleNavigation')}
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 z-10 bg-slate-300/50 opacity-100 backdrop-blur" />
      <PopoverPanel className="ui-closed:opacity-0 ui-closed:scale-95 absolute top-full right-0 z-20 mt-2 w-screen max-w-[320px] origin-top-right rounded-lg bg-white opacity-100 shadow-lg ring-1 ring-slate-900/5">
        <div className="p-4">
          <div className="border-b border-slate-200 pb-4">
            <div className="mb-2 flex justify-center">
              <LanguageSelector />
            </div>
          </div>

          <div className="border-b border-slate-200 py-3">
            <div className="space-y-1">
              <MobileNavLink href="/#features">
                {t('common.navigation.features')}
              </MobileNavLink>
              <MobileNavLink href="/#testimonials">
                {t('common.navigation.testimonials')}
              </MobileNavLink>
              <MobileNavLink href="/#pricing">
                {t('common.navigation.pricing')}
              </MobileNavLink>
              <MobileNavLink href="/blog">Blog</MobileNavLink>
              <MobileNavLink href="/terms">
                {t('common.navigation.terms')}
              </MobileNavLink>
              <MobileNavLink href="/privacy">
                {t('common.navigation.privacy')}
              </MobileNavLink>
              <div className="mt-4 flex flex-col items-center gap-y-2">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const t = useTranslations()

  return (
    <header className="py-4 md:py-10">
      <Container>
        <nav className="relative z-50 flex items-center justify-between gap-1">
          <div className="flex items-center md:gap-x-6 lg:gap-x-12">
            <Link href="/" aria-label={t('accessibility.home')}>
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/#features">
                {t('common.navigation.features')}
              </NavLink>
              <NavLink href="/#pricing">
                {t('common.navigation.pricing')}
              </NavLink>
              <NavLink href="/blog">Blog</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-3 md:gap-x-8">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden md:block">
              <UserMenu />
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
