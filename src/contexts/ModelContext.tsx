'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import {
  db,
  processautomaskwatermark,
  processmanualmaskwatermark,
} from '@/lib/firebase/client'
import { Model, RunHistoryDoc } from '@/types/firebase'

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
    setLoading(true)

    const fetchModel = async () => {
      try {
        const modelQuery = query(
          collection(db, 'models'),
          where('version', '==', '1.1'),
          where('product', '==', 'watermark'),
          limit(1),
        )

        const snapshot = await getDocs(modelQuery)

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data()
          setModels({
            watermark: {
              ...data,
              id: snapshot.docs[0].id,
            } as Model,
          })
          console.log('data', data)
        } else {
          console.log('No models found with version 1.1')
        }
      } catch (err) {
        console.error('Error fetching model:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchModel()
  }, [])

  useEffect(() => {
    console.log('models', models)
  }, [models])

  const submitModelValues = async ({
    version,
    imageBase64,
    maskBase64,
  }: {
    version: string
    imageBase64: string
    maskBase64?: string
  }) => {
    console.log('selectedMode', selectedMode)
    console.log('imageBase64', imageBase64)
    console.log('maskBase64', maskBase64)
    console.log('version', version)
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
