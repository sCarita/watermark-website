'use client'

import {
  CircleDollarSign,
  Images,
  LogOut,
  Settings2,
  UserCircle,
} from 'lucide-react'
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
import { useTranslations } from 'next-intl'

export const UserDropdown = () => {
  const { signOut } = useAuthOperations()
  const pathname = usePathname()
  const t = useTranslations()

  const isDashboard = pathname.includes('/dashboard')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          as="span"
          variant="ghost"
          size="icon"
          className="hover:bg-slate-800"
        >
          <UserCircle className="size-5 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px] rounded-md border-slate-800 bg-slate-900 p-2 shadow-md">
        {!isDashboard && (
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
              <Images className="h-4 w-4" />
              {t('common.imageEditor')}
            </DropdownMenuItem>
          </Link>
        )}
        <Link href="/dashboard/account">
          <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
            <Settings2 className="h-4 w-4" />
            {t('common.account')}
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/credits">
          <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
            <CircleDollarSign className="h-4 w-4" />
            {t('common.credits')}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="my-1 h-px bg-slate-800" />
        <DropdownMenuItem
          className="cursor-pointer rounded px-2 py-1.5 text-sm text-red-400 outline-none hover:bg-slate-800"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          {t('common.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
