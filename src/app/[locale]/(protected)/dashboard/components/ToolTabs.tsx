'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HistoryPanel } from './HistoryPanel'
import { ToolSidebar } from './ToolSidebar'
import { ImageEditor } from './ImageEditor'
import { useModels } from '@/contexts/ModelContext'
import { Badge } from '@/components/ui/badge'

interface ToolTabsProps {
  defaultTab?: 'watermark' | 'text' | 'background'
  onTabChange?: (tab: 'watermark' | 'text' | 'background') => void
}

const ToolTabs = ({ defaultTab = 'watermark', onTabChange }: ToolTabsProps) => {
  const { selectedModel, setSelectedModel, isSubmitting } = useModels()

  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex flex-1 flex-col gap-0"
      onValueChange={(value) => {
        setSelectedModel(value as typeof selectedModel)
        onTabChange?.(value as typeof selectedModel)
      }}
    >
      <div className="border-b border-slate-800">
        <div className="container">
          <TabsList className="border-b border-transparent bg-transparent">
            <TabsTrigger
              value="watermark"
              className="rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              disabled={isSubmitting}
            >
              Watermark Removal
            </TabsTrigger>
            <TabsTrigger
              value="text"
              className="relative rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              disabled
            >
              Text Removal
              <Badge
                variant="secondary"
                className="absolute -top-1.5 -right-2 px-1 text-[10px] leading-none"
              >
                Coming Soon
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="background"
              className="relative rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              disabled
            >
              Background Removal
              <Badge
                variant="secondary"
                className="absolute -top-1.5 -right-2 px-1 text-[10px] leading-none"
              >
                Coming Soon
              </Badge>
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
            <ImageEditor />
          </TabsContent>
          <TabsContent value="text" className="m-0 flex flex-1 flex-col p-0">
            <ImageEditor />
          </TabsContent>
          <TabsContent
            value="background"
            className="m-0 flex flex-1 flex-col p-0"
          >
            <ImageEditor />
          </TabsContent>
        </div>
        <HistoryPanel />
      </div>
    </Tabs>
  )
}

export default ToolTabs
