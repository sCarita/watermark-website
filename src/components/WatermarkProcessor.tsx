'use client'

import { useEffect, useState } from 'react'
import { Button } from './Button'
import FileDropUpload from './FileDropUpload'
import Alert from './Alert'
import Badge from './Badge'
import Input from './Input'
import { useI18n } from '@/hooks/useI18n'
import LoadingBar from './LoadingBar'
import clsx from 'clsx'
import LoadingImage from './LoadingImage'

const FileUploadTab = ({
  file,
  isLoading,
  progress,
  handleFileChange,
  removeFile,
}: {
  file: File | null
  isLoading: boolean
  progress: number
  handleFileChange: (files: FileList | null) => void
  removeFile: () => void
}) => {
  const { t } = useI18n()

  return (
    <>
      <div className="relative flex min-h-[300px] w-full flex-col items-center justify-center">
        {!file && (
          <FileDropUpload
            className="w-full flex-1"
            onSelectFile={handleFileChange}
          />
        )}

        {file && (
          <div className="relative flex w-full flex-1 items-center justify-center rounded-sm border border-slate-200 bg-black p-2">
            <img
              src={URL.createObjectURL(file)}
              alt={t('watermarkProcessor.fileAlt')}
              className="max-h-[220px] w-full flex-1 object-contain"
            />

            <button
              className="absolute -top-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              disabled={isLoading}
              aria-label={t('watermarkProcessor.removeFile')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
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
        )}
      </div>
    </>
  )
}

const UrlUploadTab = ({
  imageUrl,
  isLoading,
  previewError,
  progress,
  handleUrl,
  removeImageUrl,
  handleImageError,
}: {
  imageUrl: string
  isLoading: boolean
  previewError: boolean
  progress: number
  handleUrl: (url: string) => void
  removeImageUrl: () => void
  handleImageError: () => void
}) => {
  const { t } = useI18n()
  const [url, setUrl] = useState(imageUrl)
  return (
    <div className="flex min-h-[300px] w-full items-start">
      {!imageUrl && (
        <form
          className="flex h-full w-full flex-col items-start gap-1 rounded-md border border-dashed border-gray-400 p-6 sm:flex-row"
          onSubmit={() => handleUrl(url)}
        >
          <Input
            type="url"
            value={url}
            placeholder={t('watermarkProcessor.urlPlaceholder')}
            className="w-full"
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isLoading || !url}
            className="w-full disabled:pointer-events-none disabled:opacity-50 sm:max-w-[100px]"
          >
            {t('common.buttons.submit')}
          </Button>
        </form>
      )}

      {imageUrl && !previewError && (
        <div className="relative flex w-full flex-1 items-center justify-center rounded-sm border border-slate-200 bg-black p-2">
          <img
            src={imageUrl}
            alt={t('watermarkProcessor.previewAlt')}
            className="max-h-[220px] w-full flex-1 object-contain"
            onError={handleImageError}
          />
          <button
            className="absolute -top-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
            onClick={removeImageUrl}
            disabled={isLoading}
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
      )}

      {imageUrl && previewError && (
        <div className="relative flex h-full flex-col justify-center rounded-md border border-slate-800 bg-neutral-900 p-4 text-yellow-400">
          <p>{t('watermarkProcessor.previewError.message')}</p>
          <p className="mt-2 text-sm text-neutral-400">
            {t('watermarkProcessor.previewError.suggestion')}
          </p>
          <button
            className="absolute -top-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
            onClick={removeImageUrl}
            disabled={isLoading}
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
      )}
    </div>
  )
}

const ResultDisplay = ({
  result,
  setError,
  resetImage,
}: {
  result: ProcessResult
  setError: (error: string) => void
  resetImage: () => void
}) => {
  const { t } = useI18n()

  const handleDownload = async () => {
    try {
      const response = await fetch(result.processedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'processed-image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      setError(t('watermarkProcessor.errors.downloadFailed'))
    }
  }

  return (
    <div className="min-h-[300px] w-full">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <h3 className="mb-1 font-display text-lg">
            {t('watermarkProcessor.original')}
          </h3>
          <img
            src={result.originalImage}
            alt={t('watermarkProcessor.originalAlt')}
            className="w-full rounded-lg object-contain"
            onError={() =>
              setError(t('watermarkProcessor.errors.corsRestriction'))
            }
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="mb-1 font-display text-lg">
            {t('watermarkProcessor.processed')}
          </h3>
          <img
            src={result.processedImage}
            alt={t('watermarkProcessor.processedAlt')}
            className="w-full rounded-lg object-contain"
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-x-1 gap-y-2 sm:flex-row">
        <Button
          onClick={resetImage}
          download="processed-image.jpg"
          className="w-full"
          color="slate"
          variant="outline"
        >
          {t('watermarkProcessor.buttons.processAnother')}
        </Button>
        <Button
          onClick={handleDownload}
          download="processed-image.jpg"
          className="w-full"
          color="slate"
        >
          {t('watermarkProcessor.buttons.download')}
        </Button>
      </div>
    </div>
  )
}

interface ProcessResult {
  originalImage: string
  processedImage: string
  maskImage?: string
}

export default function WatermarkProcessor() {
  const { t } = useI18n()

  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

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

  const handleUrl = (url: string) => {
    setImageUrl(url)
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
        throw new Error(
          `${t('watermarkProcessor.errors.fetchFailed')}: ${response.status}`,
        )
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
        `${t('watermarkProcessor.errors.fetchingImage')}: ${error instanceof Error ? error.message : t('watermarkProcessor.errors.unknown')}`,
      )
    }
  }

  const processImage = async () => {
    if (!file && !imageUrl) return

    try {
      setProgress(0)
      setIsProcessing(true)
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
            throw new Error(t('watermarkProcessor.errors.invalidUrl'))
          }

          const result = await fetchImageAsBase64(imageUrl)
          base64 = result.base64
          contentType = result.contentType
        } catch (err) {
          console.error('URL processing error:', err)
          throw new Error(
            `${t('watermarkProcessor.errors.urlAccess')} ${err instanceof Error ? err.message : ''} ${t('watermarkProcessor.errors.tryDirectUpload')}`,
          )
        }
      } else {
        throw new Error(t('watermarkProcessor.errors.noImage'))
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
        throw new Error(
          `${t('watermarkProcessor.errors.apiError')}: ${response.status}`,
        )
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

  const handleImageError = () => {
    setPreviewError(true)
  }

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
    <div className="flex w-full flex-col gap-2">
      <div className="mb-2 flex w-full">
        <Button
          onClick={() => {
            setInputMethod('file')
            setImageUrl('')
            setError(null)
          }}
          className={clsx(
            'flex-1 rounded-md rounded-r-none',
            inputMethod === 'file'
              ? 'border border-blue-600 hover:border-blue-500'
              : '',
          )}
          color={inputMethod === 'file' ? 'blue' : 'slate'}
          variant={inputMethod === 'file' ? 'solid' : 'outline'}
        >
          {t('watermarkProcessor.buttons.uploadFile')}
        </Button>
        <Button
          onClick={() => {
            setInputMethod('url')
            setFile(null)
            setError(null)
          }}
          className={clsx(
            'flex-1 rounded-md rounded-l-none',
            inputMethod === 'url'
              ? 'hover:border-blue-5 border border-blue-600'
              : '',
          )}
          color={inputMethod === 'url' ? 'blue' : 'slate'}
          variant={inputMethod === 'url' ? 'solid' : 'outline'}
        >
          {t('watermarkProcessor.buttons.imageUrl')}
        </Button>
      </div>

      {!result || isLoading ? (
        inputMethod === 'file' ? (
          <FileUploadTab
            file={file}
            isLoading={isLoading}
            progress={progress}
            handleFileChange={handleFileChange}
            removeFile={() => {
              setFile(null)
              setResult(null)
              setError(null)
            }}
          />
        ) : (
          <UrlUploadTab
            imageUrl={imageUrl}
            previewError={previewError}
            progress={progress}
            isLoading={isLoading}
            handleUrl={handleUrl}
            handleImageError={handleImageError}
            removeImageUrl={() => {
              setImageUrl('')
              setResult(null)
              setError(null)
              setPreviewError(false)
            }}
          />
        )
      ) : (
        ''
      )}

      {!file && !imageUrl && !result && (
        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <span className="mt-1 shrink-0 text-xs text-slate-500">
              {t('watermarkProcessor.supports')}:
            </span>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1">
                <Badge>PNG</Badge>
                <Badge>JPG</Badge>
                <Badge>JPEG</Badge>
                <Badge>GIF</Badge>
                <Badge>BMP</Badge>
                <Badge>TIFF</Badge>
                <Badge>WebP</Badge>
              </div>
              <span className="mt-1 text-xs text-slate-400">
                {t('watermarkProcessor.resolution')}
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {t('watermarkProcessor.termsAgreement')}{' '}
            <a href="/terms" className="text-blue-600">
              {t('watermarkProcessor.termsOfUse')}
            </a>{' '}
            {t('common.and')}{' '}
            <a href="/privacy" className="text-blue-600">
              {t('watermarkProcessor.privacyPolicy')}
            </a>
          </p>
        </div>
      )}

      {((inputMethod === 'file' && file) ||
        (inputMethod === 'url' && imageUrl)) &&
        !result && (
          <>
            <Button
              onClick={processImage}
              disabled={isLoading}
              color="blue"
              className="w-full bg-linear-to-r from-sky-500 to-indigo-500 py-4 !text-lg hover:from-indigo-500 hover:to-sky-500 disabled:pointer-events-none disabled:opacity-50"
            >
              {t('watermarkProcessor.buttons.removeWatermark')}
            </Button>
          </>
        )}

      {result && !isLoading && (
        <ResultDisplay
          result={result}
          setError={(error) => setError(error)}
          resetImage={() => {
            setResult(null)
            setError(null)
            setFile(null)
            setImageUrl('')
          }}
        />
      )}

      {error && <Alert type="error" message={error} className="w-full" />}
    </div>
  )
}
