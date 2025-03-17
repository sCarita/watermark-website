'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Brush,
  Eraser,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react'

interface ImageEditorProps {
  mode: 'watermark' | 'text' | 'background'
}

export function ImageEditor({ mode }: ImageEditorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush')
  const [zoomLevel, setZoomLevel] = useState(100)

  // For demo purposes, we'll use placeholder images
  const demoImages = [
    'https://placehold.co/300x200',
    'https://placehold.co/300x200',
  ]

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
    switch (mode) {
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

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950">
        {!selectedImage ? (
          <div className="max-w-md p-8 text-center">
            <h3 className="mb-4 text-xl font-medium">{getModeTitle()}</h3>
            <p className="mb-6 text-slate-400">
              Upload an image or select one of the examples below to start
              removing{' '}
              {mode === 'watermark'
                ? 'watermarks'
                : mode === 'text'
                  ? 'text'
                  : 'background'}
              .
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {demoImages.map((src, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-md border border-slate-700 transition-colors hover:border-blue-500"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`Example ${index + 1}`}
                    width={200}
                    height={100}
                    unoptimized={true}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
            <Button
              variant="outline-blue"
              onClick={() => {
                /* Trigger file upload */
              }}
            >
              Upload Your Image
            </Button>
          </div>
        ) : (
          <>
            <div
              className="relative transition-transform"
              style={{
                transform: `scale(${zoomLevel / 100})`,
              }}
            >
              <Image
                src={selectedImage || '/placeholder.svg'}
                alt="Editing image"
                width={800}
                height={600}
                className="max-h-[calc(100vh-200px)] max-w-full"
              />
              {isProcessing && (
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
                disabled={zoomLevel <= 50}
                className="hover:bg-slate-700"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-xs">{zoomLevel}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
                className="hover:bg-slate-700"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {mode !== 'background' && (
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 p-2">
                <Button
                  variant={currentTool === 'brush' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setCurrentTool('brush')}
                  className={
                    currentTool === 'brush'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'hover:bg-slate-700'
                  }
                >
                  <Brush className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentTool === 'eraser' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setCurrentTool('eraser')}
                  className={
                    currentTool === 'eraser'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'hover:bg-slate-700'
                  }
                >
                  <Eraser className="h-4 w-4" />
                </Button>
                <div className="mx-1 h-6 w-px bg-slate-700"></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-700"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-700"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedImage && (
        <div className="flex items-center justify-between border-t border-slate-800 p-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedImage(null)}
            className="hover:bg-slate-800"
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-slate-700"
              onClick={() => {
                /* Save current state */
              }}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => {
                setIsProcessing(true)
                // Simulate processing
                setTimeout(() => {
                  setIsProcessing(false)
                }, 2000)
              }}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {mode === 'watermark'
                ? 'Remove Watermark'
                : mode === 'text'
                  ? 'Remove Text'
                  : 'Remove Background'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
