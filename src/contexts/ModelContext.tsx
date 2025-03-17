'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { DocumentReference } from 'firebase/firestore'

type InputField = {
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
  fields: InputField[]
}

type AvailableProcedure = any // Define your procedure type

export type Model = {
  id: string
  name: string
  procedureRef: DocumentReference<AvailableProcedure>
  inputField: {
    auto: InputFields[]
    manual: InputFields[]
    boosted: InputFields[]
  }
  details: Record<string, any>
  createdAt: string
  updatedAt: string
  version: number
}

interface ModelContextType {
  models: Record<string, Model>
  loading: boolean
  error: Error | null
  submitModelValues: (params: {
    modelId: string
    mode: 'auto' | 'manual' | 'boosted'
    values: Record<string, any>
  }) => Promise<any>
  isSubmitting: boolean
}

const ModelContext = createContext<ModelContextType>({
  models: {},
  loading: true,
  error: null,
  submitModelValues: async () => {},
  isSubmitting: false,
})

// Dummy data for development
const DUMMY_MODELS: Record<string, Model> = {
  watermark: {
    id: 'watermark-1',
    name: 'Watermark Removal',
    procedureRef: {} as any,
    inputField: {
      auto: [
        {
          label: 'dashboard.watermark.detection',
          fields: [
            {
              name: 'sensitivity',
              type: 'slider',
              label: {
                en: 'Detection Sensitivity',
                fr: 'Sensibilité de détection',
                es: 'Sensibilidad de detección',
              },
              defaultValue: 50,
              options: {
                min: '0',
                max: '100',
              },
            },
          ],
        },
      ],
      manual: [
        {
          label: 'dashboard.watermark.brush',
          fields: [
            {
              name: 'brushSize',
              type: 'slider',
              label: {
                en: 'Brush Size',
                fr: 'Taille du pinceau',
                es: 'Tamaño del pincel',
              },
              defaultValue: 20,
              options: {
                min: '1',
                max: '100',
              },
            },
            {
              name: 'hardness',
              type: 'slider',
              label: {
                en: 'Brush Hardness',
                fr: 'Dureté du pinceau',
                es: 'Dureza del pincel',
              },
              defaultValue: 50,
              options: {
                min: '0',
                max: '100',
              },
            },
          ],
        },
      ],
      boosted: [
        {
          label: 'dashboard.watermark.advanced',
          fields: [
            {
              name: 'quality',
              type: 'options',
              label: {
                en: 'Output Quality',
                fr: 'Qualité de sortie',
                es: 'Calidad de salida',
              },
              defaultValue: 'high',
              options: {
                values: ['low', 'medium', 'high', 'ultra'],
              },
            },
          ],
        },
      ],
    },
    details: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  },
  text: {
    id: 'text-1',
    name: 'Text Removal',
    procedureRef: {} as any,
    inputField: {
      auto: [
        {
          label: 'dashboard.text.detection',
          fields: [
            {
              name: 'textDetection',
              type: 'boolean',
              label: {
                en: 'Auto Text Detection',
                fr: 'Détection automatique du texte',
                es: 'Detección automática de texto',
              },
              defaultValue: true,
            },
          ],
        },
      ],
      manual: [
        {
          label: 'dashboard.text.selection',
          fields: [
            {
              name: 'selectionType',
              type: 'options',
              label: {
                en: 'Selection Type',
                fr: 'Type de sélection',
                es: 'Tipo de selección',
              },
              defaultValue: 'rectangle',
              options: {
                values: ['rectangle', 'lasso', 'magic'],
              },
            },
          ],
        },
      ],
      boosted: [],
    },
    details: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  },
  background: {
    id: 'background-1',
    name: 'Background Removal',
    procedureRef: {} as any,
    inputField: {
      auto: [
        {
          label: 'dashboard.background.detection',
          fields: [
            {
              name: 'precision',
              type: 'slider',
              label: {
                en: 'Edge Precision',
                fr: 'Précision des bords',
                es: 'Precisión de bordes',
              },
              defaultValue: 80,
              options: {
                min: '0',
                max: '100',
              },
            },
          ],
        },
      ],
      manual: [],
      boosted: [],
    },
    details: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  },
}

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<Record<string, Model>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setModels(DUMMY_MODELS)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  const submitModelValues = async ({
    modelId,
    mode,
    values,
  }: {
    modelId: string
    mode: 'auto' | 'manual' | 'boosted'
    values: Record<string, any>
  }) => {
    try {
      setIsSubmitting(true)
      console.log({ modelId, mode, values })

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelId, mode, values }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // You could update local state here if needed
      // For example, add the result to a history list

      return result
    } catch (error) {
      console.error('Error submitting model values:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ModelContext.Provider
      value={{
        models,
        loading,
        error,
        submitModelValues,
        isSubmitting,
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}

export const useModels = () => useContext(ModelContext)
