import { TopNavbar } from './components/TopNavbar'
import { ToolSidebar } from './components/ToolSidebar'
import { ImageEditor } from './components/ImageEditor'
import { HistoryPanel } from './components/HistoryPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-100">
      <TopNavbar />

      <Tabs defaultValue="watermark" className="flex flex-1 flex-col">
        <div className="border-b border-slate-800">
          <div className="container">
            <TabsList className="border-b border-transparent bg-transparent">
              <TabsTrigger
                value="watermark"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Watermark Removal
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Text Removal
              </TabsTrigger>
              <TabsTrigger
                value="background"
                className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Background Removal
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <ToolSidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <TabsContent
              value="watermark"
              className="m-0 flex flex-1 flex-col p-0"
            >
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
          </div>

          <HistoryPanel />
        </div>
      </Tabs>
    </div>
  )
}
