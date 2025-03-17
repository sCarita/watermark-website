import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const NotificationsDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="hover:bg-slate-800">
        <Bell className="h-5 w-5 text-slate-400" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent className="min-w-[220px] rounded-md border-slate-800 bg-slate-900 p-2 shadow-md">
        <DropdownMenuLabel className="px-2 py-1 text-sm text-slate-400">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
          Your image has been processed
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
          Credits running low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenu>
)
