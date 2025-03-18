'use client'

import { useState, useEffect } from 'react'
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
import { Loader } from 'lucide-react'
import { InputField, InputFields } from '@/types/firebase'
import { useTranslations } from 'next-intl'

export function ToolSidebar() {
  const t = useTranslations()
  const {
    models,
    loading,
    error,
    isSubmitting,
    selectedMode,
    selectedModel,
    setSelectedMode,
    setBrushSize,
  } = useModels()

  const [formValues, setFormValues] = useState<Record<string, any>>({})

  useEffect(() => {
    if (models[selectedModel]) {
      const currentFields = models[selectedModel].inputFields[selectedMode]
      const defaultValues: Record<string, any> = {}

      currentFields?.fields?.forEach((field) => {
        if ('defaultValue' in field) {
          defaultValues[field.name] = field.defaultValue
        }
      })

      setFormValues(defaultValues)
    }
  }, [selectedModel, selectedMode, models])

  useEffect(() => {
    setBrushSize(formValues['brushSize'])
  }, [formValues['brushSize']])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading models</div>
  }

  const currentModel = models[selectedModel]
  if (!currentModel) {
    return <div className="p-4">No model configuration found</div>
  }

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const renderField = (field: InputField) => {
    console.log('field !!!!!', field)
    switch (field.type) {
      case 'slider':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{t(field.label)}</h3>
              <span className="text-xs text-slate-400">
                {formValues[field.name] || field.defaultValue || 0}
                {field.options?.max?.includes('%') ? '%' : 'px'}
              </span>
            </div>
            <Slider
              value={[formValues[field.name] || field.defaultValue || 0]}
              min={Number(field.options?.min)}
              max={Number(field.options?.max)}
              step={1}
              onValueChange={(value) => handleInputChange(field.name, value[0])}
              className="py-2"
              disabled={isSubmitting}
            />
          </div>
        )

      case 'text':
        return (
          <Input
            type="text"
            placeholder={t(field.placeholder)}
            value={formValues[field.name] ?? field.defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(field.name, e.target.value)
            }
            className="bg-slate-800"
            disabled={isSubmitting}
          />
        )

      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={field.name}>{t(field.label)}</Label>
            <Switch
              id={field.name}
              checked={formValues[field.name] ?? field.defaultValue}
              onCheckedChange={(checked: boolean) =>
                handleInputChange(field.name, checked)
              }
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-slate-800">
              <SelectValue placeholder={t(field.placeholder)} />
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

      default:
        return null
    }
  }

  console.log('models--->', models)
  console.log('currentModel', currentModel)
  console.log('selectedModel', selectedModel)
  console.log('formValues', formValues)
  console.log('selectedMode___', selectedMode)

  return (
    <div className="flex max-h-[calc(100vh-6rem)] w-[320px] flex-col overflow-y-auto border-r border-slate-800 bg-slate-800/50">
      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Mode</h3>
          <RadioGroup
            value={selectedMode}
            onValueChange={(value: 'auto' | 'manual' | 'boosted') =>
              setSelectedMode(value)
            }
            className="grid grid-cols-3 gap-2"
            disabled={isSubmitting}
          >
            {Object.keys(currentModel?.inputFields).map((key, index) => {
              const modeOption =
                currentModel.inputFields[
                  key as keyof typeof currentModel.inputFields
                ]

              if (!modeOption) return null

              return (
                <label
                  key={index}
                  htmlFor={key}
                  className="flex cursor-pointer items-center space-x-1 rounded-md border border-slate-700 bg-slate-800 p-2"
                >
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className="text-blue-500"
                  />
                  <Label htmlFor={key} className="cursor-pointer capitalize">
                    {t(modeOption.label)}
                  </Label>
                </label>
              )
            })}
          </RadioGroup>
        </div>

        {/* Input Fields */}
        {currentModel?.inputFields?.[selectedMode]?.fields &&
          currentModel.inputFields[selectedMode].fields.map((field, index) => (
            <div key={index} className="space-y-4">
              <div key={field.name} className="space-y-2">
                {renderField(field)}
                {field.description && (
                  <p className="text-xs text-slate-400">
                    {t(field.description)}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
