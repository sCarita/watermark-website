import { Link } from '@/i18n/navigation'
import { UserDropdown } from './UserDropdown'

export function TopNavbar() {
  return (
    <header className="border-b border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl font-semibold">
            Image Editor
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-blue-400">
            <span className="text-sm">131</span>
            <span className="text-xs">credits</span>
          </div>
          {/* <Button variant="outline-blue" size="sm">
            Upgrade Plan
          </Button> */}

          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
