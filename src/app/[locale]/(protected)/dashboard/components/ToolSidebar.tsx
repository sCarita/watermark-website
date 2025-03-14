'use client'

import { useState } from 'react'
import { Upload, Settings, Brush, MagnetIcon as Magic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function ToolSidebar() {
  const [removalMode, setRemovalMode] = useState('auto')
  const [brushSize, setBrushSize] = useState(20)
  const [sensitivity, setSensitivity] = useState(50)

  return (
    <div className="flex w-[320px] flex-col overflow-y-auto border-r border-slate-800 bg-slate-800/50">
      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Upload Image</h3>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-slate-700 bg-slate-800"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </div>
          <div className="text-xs text-slate-400">
            JPG / PNG files up to 10MB with minimum dimensions of 300px
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Removal Mode</h3>
          <RadioGroup
            value={removalMode}
            onValueChange={setRemovalMode}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 rounded-md border border-slate-700 bg-slate-800 p-3">
              <RadioGroupItem
                value="auto"
                id="auto"
                className="text-blue-500"
              />
              <Label
                htmlFor="auto"
                className="flex cursor-pointer items-center gap-2"
              >
                <Magic className="h-4 w-4 text-blue-400" />
                <span>Automatic</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-slate-700 bg-slate-800 p-3">
              <RadioGroupItem
                value="manual"
                id="manual"
                className="text-blue-500"
              />
              <Label
                htmlFor="manual"
                className="flex cursor-pointer items-center gap-2"
              >
                <Brush className="h-4 w-4 text-blue-400" />
                <span>Manual</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {removalMode === 'manual' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Brush Size</h3>
              <span className="text-xs text-slate-400">{brushSize}px</span>
            </div>
            <Slider
              value={[brushSize]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setBrushSize(value[0])}
              className="py-2"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Detection Sensitivity</h3>
            <span className="text-xs text-slate-400">{sensitivity}%</span>
          </div>
          <Slider
            value={[sensitivity]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setSensitivity(value[0])}
            className="py-2"
          />
        </div>

        <div className="pt-4">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500">
            Process Image
          </Button>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-700 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  )
}
