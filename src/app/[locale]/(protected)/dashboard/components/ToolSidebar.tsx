'use client'

import { useState, useEffect } from 'react'
import { Upload, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useModels } from '@/contexts/ModelContext'

interface ToolSidebarProps {
  selectedTab: 'watermark' | 'text' | 'background'
}

type InputFieldType = {
  name: string
  type: 'slider' | 'text' | 'file' | 'number' | 'options' | 'boolean'
  label: Record<string, string>
  description?: Record<string, string>
  placeholder?: Record<string, string>
  defaultValue?: any
  options?: {
    min?: string
    max?: string
    maxSize?: string
    formats?: string[]
    values?: string[]
  }
}

type InputFields = {
  label: string
  fields: InputFieldType[]
}

export function ToolSidebar({ selectedTab }: ToolSidebarProps) {
  const { models, loading, error, submitModelValues, isSubmitting } =
    useModels()
  const [mode, setMode] = useState<'auto' | 'manual' | 'boosted'>('auto')
  const [formValues, setFormValues] = useState<Record<string, any>>({})

  // Reset form values when tab or mode changes
  useEffect(() => {
    if (models[selectedTab]) {
      const currentFields = models[selectedTab].inputField[mode]
      const defaultValues: Record<string, any> = {}

      currentFields.forEach((section) => {
        section.fields.forEach((field) => {
          if ('defaultValue' in field) {
            defaultValues[field.name] = field.defaultValue
          }
        })
      })

      setFormValues(defaultValues)
    }
  }, [selectedTab, mode, models])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading models</div>
  }

  const currentModel = models[selectedTab]
  if (!currentModel) {
    return <div className="p-4">No model configuration found</div>
  }

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const result = await submitModelValues({
        modelId: currentModel.id,
        mode,
        values: formValues,
      })

      // Handle successful submission
      console.log('Submission successful:', result)
    } catch (error) {
      // Handle error
      console.error('Submission failed:', error)
    }
  }

  const renderField = (field: InputFieldType) => {
    switch (field.type) {
      case 'slider':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{field.label.en}</h3>
              <span className="text-xs text-slate-400">
                {formValues[field.name] ?? field.defaultValue}
                {field.options?.max?.includes('%') ? '%' : 'px'}
              </span>
            </div>
            <Slider
              value={[formValues[field.name] ?? field.defaultValue]}
              min={Number(field.options?.min)}
              max={Number(field.options?.max)}
              step={1}
              onValueChange={(value) => handleInputChange(field.name, value[0])}
              className="py-2"
            />
          </div>
        )

      case 'text':
        return (
          <Input
            type="text"
            placeholder={field.placeholder?.en}
            value={formValues[field.name] ?? field.defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(field.name, e.target.value)
            }
            className="bg-slate-800"
          />
        )

      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={field.name}>{field.label.en}</Label>
            <Switch
              id={field.name}
              checked={formValues[field.name] ?? field.defaultValue}
              onCheckedChange={(checked: boolean) =>
                handleInputChange(field.name, checked)
              }
            />
          </div>
        )

      case 'options':
        return (
          <Select
            value={formValues[field.name] ?? field.defaultValue}
            onValueChange={(value: string) =>
              handleInputChange(field.name, value)
            }
          >
            <SelectTrigger className="bg-slate-800">
              <SelectValue placeholder={field.placeholder?.en} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.values?.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      // Add other field types as needed
      default:
        return null
    }
  }

  return (
    <div className="flex max-h-[calc(100vh-6rem)] w-[320px] flex-col overflow-y-auto border-r border-slate-800 bg-slate-800/50">
      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Upload Image</h3>
            <Button variant="outline-blue" size="sm">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </div>
          <div className="text-xs text-slate-400">
            JPG / PNG files up to 10MB with minimum dimensions of 300px
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Mode</h3>
          <RadioGroup
            value={mode}
            onValueChange={(value: 'auto' | 'manual' | 'boosted') =>
              setMode(value)
            }
            className="grid grid-cols-3 gap-2"
          >
            {['auto', 'manual', 'boosted'].map((modeOption) => (
              <label
                key={modeOption}
                htmlFor={modeOption}
                className="flex cursor-pointer items-center space-x-2 rounded-md border border-slate-700 bg-slate-800 p-3"
              >
                <RadioGroupItem
                  value={modeOption}
                  id={modeOption}
                  className="text-blue-500"
                />
                <Label
                  htmlFor={modeOption}
                  className="cursor-pointer capitalize"
                >
                  {modeOption}
                </Label>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Dynamic Input Fields */}
        {currentModel.inputField[mode].map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-sm font-medium">{section.label}</h3>
            {section.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                {renderField(field)}
                {field.description && (
                  <p className="text-xs text-slate-400">
                    {field.description.en}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="pt-4">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              'Process Image'
            )}
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
