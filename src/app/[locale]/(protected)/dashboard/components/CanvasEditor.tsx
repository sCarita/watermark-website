'use client'

import { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import React from 'react'

interface CanvasEditorProps {
  selectedImage: string
  brushSize: number
  hasDrawing: (hasDrawing: boolean) => void
  onDrawingChange: (maskBase64?: string) => void
  ref: React.ForwardedRef<{ reset: () => void }>
}

export const CanvasEditor = React.forwardRef<
  { reset: () => void },
  Omit<CanvasEditorProps, 'ref'>
>(({ selectedImage, brushSize, hasDrawing, onDrawingChange }, ref) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<CanvasDraw | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const checkForDrawing = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current.canvas.drawing
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] > 0) {
        hasDrawing(true)
        return
      }
    }
    hasDrawing(false)
  }

  const handleDrawingUrl = () => {
    if (!canvasRef.current || !originalDimensions) return null

    const originalCanvas = document.createElement('canvas')
    const originalCtx = originalCanvas.getContext('2d')
    if (!originalCtx) return null

    originalCanvas.width = originalDimensions.width
    originalCanvas.height = originalDimensions.height

    originalCtx.fillStyle = 'black'
    originalCtx.fillRect(0, 0, originalCanvas.width, originalCanvas.height)

    const drawingCanvas = canvasRef.current.canvas.drawing
    const drawingCtx = drawingCanvas.getContext('2d')
    if (!drawingCtx) return null

    originalCtx.drawImage(
      drawingCanvas,
      0,
      0,
      originalCanvas.width,
      originalCanvas.height,
    )

    const imageData = originalCtx.getImageData(
      0,
      0,
      originalCanvas.width,
      originalCanvas.height,
    )

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (
        imageData.data[i + 3] > 0 &&
        imageData.data[i] > 30 &&
        imageData.data[i + 1] < 20 &&
        imageData.data[i + 2] < 30
      ) {
        imageData.data[i] = 255
        imageData.data[i + 1] = 255
        imageData.data[i + 2] = 255
        imageData.data[i + 3] = 255
      } else {
        imageData.data[i] = 0
        imageData.data[i + 1] = 0
        imageData.data[i + 2] = 0
        imageData.data[i + 3] = 255
      }
    }

    originalCtx.putImageData(imageData, 0, 0)

    const dataUrl = originalCanvas.toDataURL('image/png')
    const maskBase64 = dataUrl ? dataUrl.split(',')[1] : undefined

    onDrawingChange(maskBase64)

    checkForDrawing()
  }

  useEffect(() => {
    if (!selectedImage || !canvasContainerRef.current) return

    const img = new Image()
    img.src = selectedImage
    img.onload = () => {
      if (!canvasContainerRef.current) return

      setOriginalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })

      const containerWidth = canvasContainerRef.current.clientWidth
      const aspectRatio = img.height / img.width

      setImageDimensions({
        width: containerWidth,
        height: containerWidth * aspectRatio,
      })
    }
  }, [selectedImage, canvasContainerRef.current])

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (canvasRef.current) {
        canvasRef.current.eraseAll()
        hasDrawing(false)
      }
    },
  }))

  return (
    <div ref={canvasContainerRef} className="relative w-full bg-black">
      <CanvasDraw
        ref={canvasRef}
        className="m-auto max-w-full"
        brushColor="rgba(155,12,60,0.3)"
        imgSrc={selectedImage}
        brushRadius={brushSize}
        lazyRadius={0}
        canvasWidth={imageDimensions?.width}
        canvasHeight={imageDimensions?.height}
        onChange={handleDrawingUrl}
      />
    </div>
  )
})
