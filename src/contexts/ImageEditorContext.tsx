'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import {
  db,
  processautomaskwatermark,
  processmanualmaskwatermark,
} from '@/lib/firebase/client'
import { Model } from '@/types/firebase'

interface ImageEditorContextType {
  models: Record<string, Model>
  loading: boolean
  error: Error | null
  isSubmitting: boolean
  selectedMode: 'auto' | 'manual' | 'boosted'
  selectedModel: 'watermark' | 'text' | 'background'
  brushSize: number
  processedImage: string | null
  setBrushSize: (size: number) => void
  setSelectedModel: (model: 'watermark' | 'text' | 'background') => void
  setSelectedMode: (mode: 'auto' | 'manual' | 'boosted') => void
  setProcessedImage: (image: string | null) => void
  setError: (error: Error | null) => void
  submitModelValues: (params: {
    version: string
    imageBase64: string
    maskBase64?: string
  }) => Promise<any>
}

const ImageEditorContext = createContext<ImageEditorContextType>({
  models: {},
  loading: true,
  error: null,

  isSubmitting: false,
  selectedMode: 'auto',
  selectedModel: 'watermark',
  brushSize: 10,
  processedImage: null,
  setError: () => {},
  setSelectedMode: () => {},
  setSelectedModel: () => {},
  setBrushSize: () => {},
  submitModelValues: async () => {},
  setProcessedImage: () => {},
})

export function ImageEditorProvider({
  children,
}: {
  children: React.ReactNode
}) {
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
        } else {
          console.warn('No models found with version 1.1')
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
    <ImageEditorContext.Provider
      value={{
        models,
        loading,
        error,
        isSubmitting,
        selectedMode,
        selectedModel,
        brushSize,
        processedImage,
        setError,
        setBrushSize,
        setSelectedMode,
        setSelectedModel,
        submitModelValues,
        setProcessedImage,
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  )
}

export const useImageEditor = () => useContext(ImageEditorContext)
