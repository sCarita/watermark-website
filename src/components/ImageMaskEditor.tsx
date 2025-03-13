import CanvasDraw from 'react-canvas-draw'
import { Button } from './Button'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dialog } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { ProcessedImageResult } from './ProcessedImageResult'
import LoadingImage from './LoadingImage'
import LoadingBar from './LoadingBar'
import Alert from './Alert'

interface ProcessResult {
  originalImage: string
  processedImage: string
  maskImage?: string
}

const ImageMaskEditor = ({
  imageUrl,
  dialogOpen,
  toggleDialog,
  resetImage,
}: {
  imageUrl: string
  dialogOpen: boolean
  toggleDialog: () => void
  resetImage: () => void
}) => {
  const t = useTranslations()

  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<CanvasDraw | null>(null)

  const [isOpen, setIsOpen] = useState(dialogOpen)
  const [hasDrawing, setHasDrawing] = useState(false)

  const [brushRadius, setBrushRadius] = useState(10)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const [result, setResult] = useState<ProcessResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const closeDialog = () => {
    setIsOpen(false)
    toggleDialog()
  }

  const checkForDrawing = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current.canvas.drawing
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get the canvas image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    // Check if any pixel has alpha value > 0
    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] > 0) {
        setHasDrawing(true)
        return
      }
    }
    setHasDrawing(false)
  }

  const handleDrawingUrl = () => {
    if (!canvasRef.current || !hasDrawing || !originalDimensions) return null

    // Create a new canvas at original image dimensions
    const originalCanvas = document.createElement('canvas')
    const originalCtx = originalCanvas.getContext('2d')
    if (!originalCtx) return null

    // Set canvas to original image dimensions
    originalCanvas.width = originalDimensions.width
    originalCanvas.height = originalDimensions.height

    // Fill with black background
    originalCtx.fillStyle = 'black'
    originalCtx.fillRect(0, 0, originalCanvas.width, originalCanvas.height)

    // Get the current drawing canvas
    const drawingCanvas = canvasRef.current.canvas.drawing
    const drawingCtx = drawingCanvas.getContext('2d')
    if (!drawingCtx) return null

    // Scale the drawing to match original dimensions
    originalCtx.drawImage(
      drawingCanvas,
      0,
      0,
      originalCanvas.width,
      originalCanvas.height,
    )

    // Get the image data to transform red to white
    const imageData = originalCtx.getImageData(
      0,
      0,
      originalCanvas.width,
      originalCanvas.height,
    )
    const data = imageData.data

    // Transform any non-black pixel to white
    // for (let i = 0; i < data.length; i += 4) {
    //   if (data[i + 3] > 0) {
    //     // If pixel has any opacity
    //     data[i] = 255 // R
    //     data[i + 1] = 255 // G
    //     data[i + 2] = 255 // B
    //     data[i + 3] = 255 // A
    //   }
    // }

    // Put the modified image data back
    originalCtx.putImageData(imageData, 0, 0)

    const dataUrl = originalCanvas.toDataURL('image/png')

    // Create a temporary image element to preview the mask
    // const tempImg = document.createElement('img')
    // tempImg.src = dataUrl
    // tempImg.style.position = 'fixed'
    // tempImg.style.top = '10px'
    // tempImg.style.right = '10px'
    // tempImg.style.zIndex = '9999'
    // document.body.appendChild(tempImg)

    processImage(dataUrl)
  }

  const processImage = async (dataUrl: string) => {
    try {
      setProgress(0)
      setIsProcessing(true)
      setIsLoading(true)
      setError(null)

      // Extract the mask base64 data by removing the data URL prefix
      const maskBase64 = dataUrl.split(',')[1]

      let imageBase64: string
      try {
        imageBase64 = await getBase64FromUrl(imageUrl)
      } catch (err) {
        console.error('URL processing error:', err)
        throw new Error(
          `${t('watermarkProcessor.errors.urlAccess')} ${err instanceof Error ? err.message : ''} ${t('watermarkProcessor.errors.tryDirectUpload')}`,
        )
      }

      // Call the API
      const response = await fetch(
        'https://processmanualmaskwatermark-k677kyuleq-uc.a.run.app/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              imageBase64,
              maskBase64,
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(
          `${t('watermarkProcessor.errors.apiError')}: ${response.status}`,
        )
      }

      const data = await response.json()

      // Handle the specific response format
      if (data.result && data.result.success) {
        setResult({
          originalImage: imageUrl,
          processedImage: data.result.inpaintedImageUrl,
        })
      } else {
        throw new Error(t('watermarkProcessor.errors.processingFailed'))
      }
    } catch (err) {
      console.error('Error processing image:', err)
      setError(
        err instanceof Error
          ? err.message
          : t('watermarkProcessor.errors.unknown'),
      )
    } finally {
      setIsProcessing(false)
    }
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
    if (!isOpen) return

    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      if (!canvasContainerRef.current) return

      // Store the original dimensions
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
  }, [imageUrl, isOpen])

  useEffect(() => {
    setIsOpen(dialogOpen)
  }, [dialogOpen])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isProcessing) {
      // Reset progress when processing starts
      setProgress(0)

      intervalId = setInterval(() => {
        setProgress((currentProgress) => {
          // Slow down as we approach 90%
          if (currentProgress >= 90) {
            return currentProgress + 0.1
          }
          // Normal speed up to 90%
          return currentProgress + (90 - currentProgress) * 0.015
        })
      }, 100)
    } else {
      // When processing is complete, quickly go to 100%
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isProcessing])

  return (
    <Dialog
      open={isOpen}
      as="div"
      transition
      className="relative z-50 transition duration-300 ease-out focus:outline-none data-[closed]:opacity-0"
      onClose={closeDialog}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex min-h-full w-screen items-center justify-center overflow-x-auto p-4">
        <DialogPanel className="relative w-lg max-w-full space-y-4 bg-white">
          <div className="flex w-full items-center justify-between border-b border-slate-200 p-4">
            <DialogTitle as="h3" className="text-base/7 font-medium">
              {t('watermarkProcessor.imageMaskEditor.title')}
            </DialogTitle>
            <button
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
              onClick={closeDialog}
              aria-label={t('watermarkProcessor.removeImage')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="px-12 pb-12">
            {/* CANVAS */}
            {(!result || isLoading) && (
              <div className="relative flex flex-col gap-2">
                {' '}
                <div className="flex items-center justify-between">
                  <div className="flex max-w-[200px] flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span>
                        {t('watermarkProcessor.imageMaskEditor.brushRadius')}
                      </span>
                      <div
                        className=""
                        style={{
                          left: `calc(${((brushRadius - 1) / 99) * 100}% + (${8 - ((brushRadius - 1) / 99) * 16}px))`,
                        }}
                      >
                        {brushRadius}px
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={brushRadius}
                      onChange={(e) => setBrushRadius(Number(e.target.value))}
                      className="range-slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500 hover:accent-blue-600 disabled:pointer-events-none"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      canvasRef.current?.eraseAll()
                      setHasDrawing(false)
                    }}
                    className="flex items-center gap-1.5 disabled:pointer-events-none disabled:opacity-50"
                    disabled={!hasDrawing || isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m12.035 12.089l-2.915 2.93C7.707 16.44 7 17.15 7 18.035s.707 1.596 2.12 3.017l.33.332c.303.304.454.456.646.536c.191.08.404.08.83.08h2.218c.426 0 .639 0 .83-.08c.192-.08.343-.232.646-.536l3.33-3.349m-5.915-5.946l1.997-2.008c1.375-1.382 2.062-2.073 2.913-2.08h.04c.85.007 1.538.698 2.913 2.08c1.396 1.404 2.094 2.106 2.102 2.979v.04c-.008.873-.706 1.575-2.102 2.978l-1.947 1.957m-5.916-5.946l5.916 5.946M9 9L7.5 5.5m0 0L6.184 2.43a1 1 0 0 0-.078-.165a.6.6 0 0 0-.412-.258C5.649 2 5.599 2 5.5 2c-.1 0-.149 0-.194.007a.6.6 0 0 0-.412.258a1 1 0 0 0-.078.164L3.5 5.5m4 0h-4m0 0L2 9"
                        color="#fff"
                      ></path>
                    </svg>
                    {t('watermarkProcessor.imageMaskEditor.eraseAll')}
                  </Button>
                </div>
                <div ref={canvasContainerRef} className="relative bg-black">
                  <CanvasDraw
                    ref={canvasRef}
                    className="m-auto max-w-full"
                    brushColor="rgba(255,255,255,1)"
                    imgSrc={imageUrl}
                    onChange={checkForDrawing}
                    brushRadius={brushRadius}
                    lazyRadius={0}
                    canvasWidth={imageDimensions?.width}
                    canvasHeight={imageDimensions?.height}
                  />
                  {isLoading && (
                    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black/50 text-white">
                      <div className="flex items-center gap-2">
                        <LoadingImage />
                        {t('watermarkProcessor.processing')}
                      </div>
                      <LoadingBar className="mt-2" progress={progress} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleDrawingUrl}
                    color="blue"
                    disabled={!hasDrawing || isLoading}
                    className="flex w-full items-center gap-1.5 bg-linear-to-r from-sky-500 to-indigo-500 py-4 !text-lg hover:from-indigo-500 hover:to-sky-500 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      className="rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m13.926 12.778l-2.149-2.149c-.292-.293-.439-.439-.597-.517a1.07 1.07 0 0 0-.954 0c-.158.078-.304.224-.597.517s-.439.44-.517.597c-.15.301-.15.654 0 .954c.078.158.224.305.517.598l2.149 2.148m2.148-2.149l6.445 6.446c.293.292.439.439.517.597c.15.3.15.653 0 .954c-.078.157-.224.304-.517.597s-.44.439-.597.517c-.301.15-.654.15-.954 0c-.158-.078-.305-.224-.598-.517l-6.445-6.445m2.149-2.149l-2.149 2.149M17 2l.295.797c.386 1.044.58 1.566.96 1.947c.382.381.904.575 1.948.961L21 6l-.797.295c-1.044.386-1.566.58-1.947.96c-.381.382-.575.904-.961 1.948L17 10l-.295-.797c-.386-1.044-.58-1.566-.96-1.947c-.382-.381-.904-.575-1.948-.961L13 6l.797-.295c1.044-.386 1.566-.58 1.947-.96c.381-.382.575-.904.961-1.948zM6 4l.221.597c.29.784.435 1.176.72 1.461c.286.286.678.431 1.462.72L9 7l-.597.221c-.784.29-1.176.435-1.461.72c-.286.286-.431.678-.72 1.462L6 10l-.221-.597c-.29-.784-.435-1.176-.72-1.461c-.286-.286-.678-.431-1.462-.72L3 7l.597-.221c.784-.29 1.176-.435 1.461-.72c.286-.286.431-.678.72-1.462z"
                        color="#fff"
                      />
                    </svg>
                    {t('watermarkProcessor.buttons.removeWatermark')}
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <Alert type="error" message={error} className="mt-4 w-full" />
            )}

            {result && !isLoading && (
              <ProcessedImageResult
                result={result}
                setError={(error) => setError(error)}
                resetImage={resetImage}
              />
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ImageMaskEditor
