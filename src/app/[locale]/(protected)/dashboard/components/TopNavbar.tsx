import { Bell, ChevronDown, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthOperations } from '@/hooks/useAuthOperations'
import { SignOutItem } from './SignOutItem'

export function TopNavbar() {
  return (
    <header className="border-b border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">AI Image Editor</h1>
          <div className="flex items-center rounded-md border border-slate-700 bg-slate-800">
            <span className="px-3 py-1 text-sm">CLEANSE 1.0</span>
            <span className="mr-1 rounded bg-blue-500 px-2 py-0.5 text-xs text-white">
              NEW
            </span>
            <ChevronDown className="mr-2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-blue-400">
            <span className="text-sm">131</span>
            <span className="text-xs">credits</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-sm"
          >
            Upgrade Plan
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-500 text-sm hover:bg-blue-600"
          >
            API Calls
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-slate-800"
              >
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

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-slate-800"
              >
                <UserCircle className="h-5 w-5 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent className="min-w-[200px] rounded-md border-slate-800 bg-slate-900 p-2 shadow-md">
                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1.5 text-sm text-white outline-none hover:bg-slate-800">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 h-px bg-slate-800" />
                <SignOutItem />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
