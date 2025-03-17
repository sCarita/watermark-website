'use client'

import { useState, ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HistoryPanel } from './HistoryPanel'
import { ToolSidebar } from './ToolSidebar'

interface ToolTabsProps {
  children: ReactNode
  defaultTab?: 'watermark' | 'text' | 'background'
  onTabChange?: (tab: 'watermark' | 'text' | 'background') => void
}

const ToolTabs = ({
  children,
  defaultTab = 'watermark',
  onTabChange,
}: ToolTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<
    'watermark' | 'text' | 'background'
  >(defaultTab)

  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex flex-1 flex-col"
      onValueChange={(value) => {
        setSelectedTab(value as typeof selectedTab)
        onTabChange?.(value as typeof selectedTab)
      }}
    >
      <div className="border-b border-slate-800">
        <div className="container">
          <TabsList className="border-b border-transparent bg-transparent">
            <TabsTrigger
              value="watermark"
              className="rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Watermark Removal
            </TabsTrigger>
            <TabsTrigger
              value="text"
              className="rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Text Removal
            </TabsTrigger>
            <TabsTrigger
              value="background"
              className="rounded-none !bg-transparent px-6 py-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Background Removal
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ToolSidebar selectedTab={selectedTab} />
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <HistoryPanel />
      </div>
    </Tabs>
  )
}

export default ToolTabs
