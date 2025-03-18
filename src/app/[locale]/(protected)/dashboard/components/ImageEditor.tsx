'use client'

import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { Undo, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import demmoImage1 from '@/images/watermark-example-1.png'
import demmoImage2 from '@/images/watermark-example-2.png'
import FileDropUpload from '@/components/FileDropUpload'
import { useModels } from '@/contexts/ModelContext'
import { CanvasEditor } from './CanvasEditor'
import { toast } from 'sonner'
import { ProcessedImageResult } from '@/components/ProcessedImageResult'

export function ImageEditor() {
  const {
    selectedModel,
    selectedMode,
    brushSize,
    isSubmitting,
    processedImage,
    error,
    submitModelValues,
    setProcessedImage,
  } = useModels()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)

  const [maskBase64, setMaskBase64] = useState<string | undefined>(undefined)
  const [hasDrawing, setHasDrawing] = useState(false)

  const demoImages = [demmoImage1, demmoImage2]

  const canvasEditorRef = useRef<{ reset: () => void } | null>(null)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50))
  }

  const handleReset = () => {
    setZoomLevel(100)
  }

  const getModeTitle = () => {
    switch (selectedModel) {
      case 'watermark':
        return 'Watermark Removal'
      case 'text':
        return 'Text Removal'
      case 'background':
        return 'Background Removal'
      default:
        return 'Image Editor'
    }
  }

  const resetImage = () => {
    setSelectedImage(null)
    setProcessedImage(null)
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(processedImage!)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'processed-image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    }
  }

  const processImage = async () => {
    let imageBase64: string
    try {
      imageBase64 = await getBase64FromUrl(selectedImage!)
    } catch (err) {
      console.error('URL processing error:', err)
      throw new Error(`error: ${err instanceof Error ? err.message : ''} error`)
    }

    submitModelValues({
      version: '1.0',
      imageBase64,
      maskBase64: maskBase64 || undefined,
    })
  }

  const getBase64FromUrl = async (objectUrl: string): Promise<string> => {
    // Fetch the blob from the object URL
    const response = await fetch(objectUrl)
    const blob = await response.blob()

    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        // Remove the data:image/jpeg;base64, prefix
        const base64 = base64String.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  useEffect(() => {
    if (processedImage && selectedImage)
      toast.success('Image processed successfully')
  }, [processedImage, selectedImage])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  useEffect(() => {
    return () => {
      resetImage()
    }
  }, [])

  return (
    <div className="relative flex max-h-[calc(100vh-6rem)] flex-1 flex-col">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950">
        {!selectedImage ? (
          <div className="max-w-md p-8 text-center">
            <h3 className="mb-1 text-xl font-medium">{getModeTitle()}</h3>
            <p className="mb-4 text-slate-400">
              Upload an image or select one of the examples below to start
              removing{' '}
              {selectedModel === 'watermark'
                ? 'watermarks'
                : selectedModel === 'text'
                  ? 'text'
                  : 'background'}
              .
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {demoImages.map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-md border border-slate-700 transition-colors hover:border-blue-500"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <NextImage
                    src={img.src || '/placeholder.svg'}
                    alt={`Example ${index + 1}`}
                    width={200}
                    height={100}
                    className="h-28 w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <FileDropUpload
              onSelectFile={(files) => {
                if (files && files.length > 0) {
                  setSelectedImage(URL.createObjectURL(files[0]))
                }
              }}
            />
          </div>
        ) : (
          <>
            <div
              className="transition-transforml relative w-full"
              style={{
                transform: `scale(${zoomLevel / 100})`,
              }}
            >
              {(selectedMode === 'auto' || processedImage) && (
                <NextImage
                  src={processedImage || selectedImage}
                  alt="Editing image"
                  width={800}
                  height={600}
                  className="h-full w-full"
                />
              )}
              {selectedMode !== 'auto' && !processedImage && (
                <CanvasEditor
                  ref={canvasEditorRef}
                  selectedImage={selectedImage}
                  brushSize={brushSize}
                  hasDrawing={setHasDrawing}
                  onDrawingChange={(maskBase64) => setMaskBase64(maskBase64)}
                />
              )}
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p>Processing image...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-md border border-slate-700 bg-slate-800 p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50 || isSubmitting}
                className="hover:bg-slate-700"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-xs">{zoomLevel}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200 || isSubmitting}
                className="hover:bg-slate-700"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                disabled={isSubmitting}
                className="hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {selectedModel !== 'background' && selectedMode !== 'auto' && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 p-1.5">
                <span className="text-xs">Reset</span>
                <div className="mx-1 h-6 w-px bg-slate-700"></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-slate-700 hover:text-white"
                  onClick={() => {
                    canvasEditorRef.current?.reset()
                  }}
                  disabled={isSubmitting || !hasDrawing}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedImage && !processedImage && (
        <div className="flex items-center justify-between border-t border-slate-800 p-4">
          <Button
            variant="ghost"
            onClick={resetImage}
            className="hover:bg-slate-800"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={processImage}
              disabled={
                (selectedMode !== 'auto' && !hasDrawing) || isSubmitting
              }
              className="bg-blue-500 hover:bg-blue-600"
            >
              {selectedModel === 'watermark'
                ? 'Remove Watermark'
                : selectedModel === 'text'
                  ? 'Remove Text'
                  : 'Remove Background'}
            </Button>
          </div>
        </div>
      )}

      {processedImage && (
        <div className="flex items-center justify-between border-t border-slate-800 p-4">
          <Button
            variant="ghost"
            onClick={resetImage}
            className="hover:bg-slate-800"
          >
            Process another
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={downloadImage}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
