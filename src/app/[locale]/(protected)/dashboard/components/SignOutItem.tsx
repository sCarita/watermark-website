'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useAuthOperations } from '@/hooks/useAuthOperations'

export function SignOutItem() {
  const { signOut } = useAuthOperations()

  return (
    <DropdownMenuItem
      className="cursor-pointer rounded px-2 py-1.5 text-sm text-red-400 outline-none hover:bg-slate-800"
      onClick={signOut}
    >
      Sign out
    </DropdownMenuItem>
  )
}
