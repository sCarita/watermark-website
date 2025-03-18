'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { DocumentReference } from 'firebase/firestore'
import {
  processautomaskwatermark,
  processmanualmaskwatermark,
} from '@/lib/firebase/client'

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
  version: string
}

interface ModelContextType {
  models: Record<string, Model>
  loading: boolean
  error: Error | null
  setError: (error: Error | null) => void
  submitModelValues: (params: {
    version: string
    imageBase64: string
    maskBase64?: string
  }) => Promise<any>
  isSubmitting: boolean
  selectedMode: 'auto' | 'manual' | 'boosted'
  setSelectedMode: (mode: 'auto' | 'manual' | 'boosted') => void
  selectedModel: 'watermark' | 'text' | 'background'
  setSelectedModel: (model: 'watermark' | 'text' | 'background') => void
  brushSize: number
  setBrushSize: (size: number) => void
  processedImage: string | null
  setProcessedImage: (image: string | null) => void
}

const ModelContext = createContext<ModelContextType>({
  models: {},
  loading: true,
  error: null,
  setError: () => {},
  submitModelValues: async () => {},
  isSubmitting: false,
  selectedMode: 'auto',
  setSelectedMode: () => {},
  selectedModel: 'watermark',
  setSelectedModel: () => {},
  brushSize: 10,
  setBrushSize: () => {},
  processedImage: null,
  setProcessedImage: () => {},
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
    version: '1.0',
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
    version: '1.0',
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
    version: '1.0',
  },
}

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<Record<string, Model>>({})

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedMode, setSelectedMode] = useState<
    'auto' | 'manual' | 'boosted'
  >('auto')

  const [selectedModel, setSelectedModel] = useState<
    'watermark' | 'text' | 'background'
  >('watermark')
  const [brushSize, setBrushSize] = useState(10)

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
    version,
    imageBase64,
    maskBase64,
  }: {
    version: string
    imageBase64: string
    maskBase64?: string
  }) => {
    try {
      setIsSubmitting(true)
      setProcessedImage(null)
      setError(null) // Reset error state

      let response
      if (selectedMode === 'auto') {
        response = await processautomaskwatermark({
          version,
          imageBase64,
        })
      } else {
        response = await processmanualmaskwatermark({
          version,
          imageBase64,
          maskBase64,
        })
      }

      if (!response.data.success) {
        setError(new Error('Failed to process image'))
        throw new Error('Failed to process image')
      }

      if (response.data.inpaintedImageUrl) {
        setProcessedImage(response.data.inpaintedImageUrl)
      }

      return response
    } catch (error) {
      console.error('Error submitting model values:', error)
      setError(error as Error)
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
        setError,
        submitModelValues,
        isSubmitting,
        selectedMode,
        setSelectedMode,
        selectedModel,
        setSelectedModel,
        brushSize,
        setBrushSize,
        processedImage,
        setProcessedImage,
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}

export const useModels = () => useContext(ModelContext)
