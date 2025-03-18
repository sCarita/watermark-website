import { TopNavbar } from './components/TopNavbar'
import ToolTabs from './components/ToolTabs'
import { Toaster } from '@/components/ui/sonner'

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100">
      <TopNavbar />
      <ToolTabs />
      <Toaster />
    </div>
  )
}
