'use client'

import { useState } from 'react'
import { Button } from './Button'
import FileDropUpload from './FileDropUpload'
import Alert from './Alert'

interface ProcessResult {
  originalImage: string
  processedImage: string
  maskImage?: string
}

export default function WatermarkProcessor() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ProcessResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [inputMethod, setInputMethod] = useState<'file' | 'url'>('file')
  const [previewError, setPreviewError] = useState<boolean>(false)

  const handleFileChange = (files: FileList | null) => {
    const file = files?.[0]
    if (file) {
      setFile(file)
      setImageUrl('')
      setResult(null)
      setError(null)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setFile(null)
    setResult(null)
    setError(null)
    setPreviewError(false)
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result as string
        // Remove the data:image/jpeg;base64, prefix
        const base64 = base64String.split(',')[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const fetchImageAsBase64 = async (
    url: string,
  ): Promise<{ base64: string; contentType: string }> => {
    try {
      // Check if the URL is already a data URL
      if (url.startsWith('data:')) {
        const parts = url.split(',')
        const contentType = parts[0].split(':')[1].split(';')[0]
        const base64 = parts[1]
        return { base64, contentType }
      }

      // For external URLs, use a CORS proxy
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`

      const response = await fetch(corsProxyUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }

      const blob = await response.blob()
      const contentType = blob.type || 'image/jpeg'

      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          const base64String = reader.result as string
          // Remove the data:image/jpeg;base64, prefix
          const base64 = base64String.split(',')[1]
          resolve({ base64, contentType })
        }
        reader.onerror = (error) => reject(error)
      })
    } catch (error) {
      console.error('Error fetching image:', error)
      throw new Error(
        `Error fetching image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  const processImage = async () => {
    if (!file && !imageUrl) return

    try {
      setIsLoading(true)
      setError(null)

      let base64: string
      let contentType: string = 'image/jpeg'

      // Get base64 from either file or URL
      if (file) {
        base64 = await convertToBase64(file)
        contentType = file.type
      } else if (imageUrl) {
        try {
          // Validate URL format
          if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
            throw new Error(
              'Please enter a valid URL starting with http:// or https://',
            )
          }

          const result = await fetchImageAsBase64(imageUrl)
          base64 = result.base64
          contentType = result.contentType
        } catch (err) {
          console.error('URL processing error:', err)
          throw new Error(
            `Could not access the image URL. ${err instanceof Error ? err.message : ''} Please try downloading the image and uploading it directly.`,
          )
        }
      } else {
        throw new Error('No image provided')
      }

      // Call the API
      const response = await fetch(
        'https://processwatermark-k677kyuleq-uc.a.run.app/processWatermark',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              imageBase64: base64,
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Handle the specific response format
      if (data.result && data.result.success) {
        setResult({
          originalImage: file
            ? `data:${contentType};base64,${base64}`
            : imageUrl,
          processedImage: data.result.inpaintedImageUrl,
          // Still store the mask image in case we need it later, but don't display it
          maskImage: data.result.maskBase64
            ? `data:image/png;base64,${data.result.maskBase64}`
            : undefined,
        })
      } else {
        throw new Error('Processing failed or returned unexpected format')
      }
    } catch (err) {
      console.error('Error processing image:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageError = () => {
    setPreviewError(true)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full gap-4">
        <Button
          onClick={() => setInputMethod('file')}
          className="flex-1"
          variant={inputMethod === 'file' ? 'primary' : 'neutral'}
        >
          Upload File
        </Button>
        <Button
          onClick={() => setInputMethod('url')}
          className="flex-1"
          variant={inputMethod === 'url' ? 'primary' : 'neutral'}
        >
          Image URL
        </Button>
      </div>

      {inputMethod === 'file' ? (
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          {!file && (
            <FileDropUpload
              className="w-full"
              onSelectFile={handleFileChange}
            />
          )}

          {file && (
            <>
              <img
                src={URL.createObjectURL(file)}
                alt="File"
                className="w-full"
              />
              <button
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  setResult(null)
                  setError(null)
                }}
              >
                x
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex w-full">
            <input
              type="url"
              value={imageUrl}
              onChange={handleUrlChange}
              placeholder="Enter image URL (https://example.com/image.jpg)"
              className="w-full rounded-lg border border-slate-800 bg-neutral-950 p-4 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageUrl && (
              <button
                className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600"
                onClick={() => {
                  setImageUrl('')
                  setResult(null)
                  setError(null)
                  setPreviewError(false)
                }}
              >
                x
              </button>
            )}
          </div>
          {imageUrl && !previewError && (
            <div className="mt-2 rounded-lg border border-slate-800 p-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-[200px] w-full rounded-lg object-contain"
                onError={handleImageError}
              />
            </div>
          )}
          {imageUrl && previewError && (
            <div className="mt-2 rounded-lg border border-slate-800 bg-neutral-900 p-4 text-yellow-400">
              <p>
                Cannot preview this image due to CORS restrictions, but we'll
                still try to process it.
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                If processing fails, try downloading the image and uploading it
                directly.
              </p>
            </div>
          )}
        </div>
      )}

      {((inputMethod === 'file' && file) ||
        (inputMethod === 'url' && imageUrl)) &&
        !result && (
          <Button
            onClick={processImage}
            disabled={isLoading}
            variant="success"
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </div>
            ) : (
              'Remove Watermark'
            )}
          </Button>
        )}

      {error && <Alert type="error" message={error} className="w-full" />}

      {result && (
        <div className="mt-4 w-full">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <h3 className="mb-2 text-lg font-medium">Original</h3>
              <img
                src={result.originalImage}
                alt="Original"
                className="max-h-[300px] w-full rounded-lg object-contain"
                onError={() =>
                  setError(
                    'Cannot display original image due to CORS restrictions',
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mb-2 text-lg font-medium">Processed</h3>
              <img
                src={result.processedImage}
                alt="Processed"
                className="max-h-[300px] w-full rounded-lg object-contain"
              />
              <a
                href={result.processedImage}
                download="processed-image.jpg"
                className="mt-2 rounded-lg bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
