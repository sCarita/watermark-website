'use client'

import { UserCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthOperations } from '@/hooks/useAuthOperations'
import { usePathname } from 'next/navigation'

export const UserDropdown = () => {
  const { signOut } = useAuthOperations()
  const pathname = usePathname()

  const isDashboard = pathname.includes('/dashboard')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
          <UserCircle className="h-5 w-5 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px] rounded-md border-slate-800 bg-slate-900 p-2 shadow-md">
        {!isDashboard && (
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
              Image Editor
            </DropdownMenuItem>
          </Link>
        )}
        <Link href="/dashboard/profile">
          <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/settings">
          <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="my-1 h-px bg-slate-800" />
        <DropdownMenuItem
          className="cursor-pointer rounded px-2 py-1.5 text-sm text-red-400 outline-none hover:bg-slate-800"
          onClick={signOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
