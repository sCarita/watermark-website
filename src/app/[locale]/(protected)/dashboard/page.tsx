import { TopNavbar } from './components/TopNavbar'
import { ImageEditor } from './components/ImageEditor'
import { TabsContent } from '@/components/ui/tabs'
import ToolTabs from './components/ToolTabs'

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100">
      <TopNavbar />
      <ToolTabs>
        <TabsContent value="watermark" className="m-0 flex flex-1 flex-col p-0">
          <ImageEditor mode="watermark" />
        </TabsContent>
        <TabsContent value="text" className="m-0 flex flex-1 flex-col p-0">
          <ImageEditor mode="text" />
        </TabsContent>
        <TabsContent
          value="background"
          className="m-0 flex flex-1 flex-col p-0"
        >
          <ImageEditor mode="background" />
        </TabsContent>
      </ToolTabs>
    </div>
  )
}
