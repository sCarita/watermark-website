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
import { useImageEditor } from '@/contexts/ImageEditorContext'
import { Loader2 } from 'lucide-react'
import { InputField } from '@/types/firebase'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function ToolSidebar() {
  const t = useTranslations()
  const {
    models,
    loading,
    error,
    isSubmitting,
    selectedMode,
    selectedModel,
    setError,
    setSelectedMode,
    setBrushSize,
  } = useImageEditor()

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

  useEffect(() => {
    const toastId = 'watermarkSubmitError'
    if (error) {
      const errorMessage =
        error.message && error.message !== 'INTERNAL'
          ? error.message
          : 'Something went wrong'

      toast.error(errorMessage, {
        id: toastId,
      })
    }

    return () => {
      toast.dismiss(toastId)
      setError(null)
    }
  }, [error])

  if (loading) {
    return (
      <div className="flex h-full w-[250px] items-center justify-center xl:w-[320px]">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  const currentModel = models[selectedModel]
  if (!currentModel) {
    return (
      <div className="flex h-full w-[250px] items-center justify-center xl:w-[320px]">
        <div>No model configuration found</div>
      </div>
    )
  }

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const renderField = (field: InputField) => {
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

  return (
    <div className="flex max-h-[calc(100vh-6rem)] w-[250px] flex-col overflow-y-auto border-r border-slate-800 bg-slate-800/50 xl:w-[320px]">
      <div className="space-y-4 p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            {t('dashboard.toolSidebar.mode')}
          </h3>
          <RadioGroup
            value={selectedMode}
            onValueChange={(value: 'auto' | 'manual' | 'boosted') =>
              setSelectedMode(value)
            }
            className="flex flex-wrap gap-2"
            disabled={isSubmitting}
          >
            {['auto', 'manual', 'boosted']
              .filter(
                (key) =>
                  currentModel?.inputFields[
                    key as keyof typeof currentModel.inputFields
                  ],
              )
              .map((key) => {
                const modeOption =
                  currentModel.inputFields[
                    key as keyof typeof currentModel.inputFields
                  ]

                if (!modeOption) return null

                return (
                  <label
                    key={key}
                    htmlFor={key}
                    className="flex flex-1 cursor-pointer items-center space-x-1 rounded-md border border-slate-700 bg-slate-800 p-2"
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

        <div>
          <>
            <h4 className="mb-1 text-sm font-medium">
              {selectedMode === 'auto' &&
                t('dashboard.toolSidebar.autoModeDescription')}
              {selectedMode === 'manual' &&
                t('dashboard.toolSidebar.manualModeDescription')}
            </h4>
            <p className="text-xs text-slate-400">
              {selectedMode === 'auto' &&
                t('dashboard.toolSidebar.autoModeHint')}
              {selectedMode === 'manual' &&
                t('dashboard.toolSidebar.manualModeHint')}
            </p>
          </>
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
