'use client'

import { Link } from '@/i18n/navigation'
import { UserDropdown } from '../../../../../components/UserDropdown'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'

export function TopNavbar() {
  const { credits } = useAuth()

  return (
    <header className="border-b border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl font-semibold">
            <Logo className="h-5 w-auto" light />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/credits"
            className="flex items-center gap-1 text-blue-400"
          >
            <span className="text-sm">{credits}</span>
            <span className="text-xs">credits</span>
          </Link>
          {/* <Button variant="outline-blue" size="sm">
            Upgrade Plan
          </Button> */}

          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
