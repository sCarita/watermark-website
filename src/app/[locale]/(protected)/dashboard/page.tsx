import { TopNavbar } from './components/TopNavbar'
import { ImageEditor } from './components/ImageEditor'
import { TabsContent } from '@/components/ui/tabs'
import ToolTabs from './components/ToolTabs'

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100">
      <TopNavbar />
      <ToolTabs />
    </div>
  )
}
