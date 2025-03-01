'use client'

import { useState } from 'react'
import { Button } from './Button'
import FileDropUpload from './FileDropUpload'
import Alert from './Alert'
import Badge from './Badge'
import Input from './Input'
import { useI18n } from '@/hooks/useI18n'

const FileUploadTab = ({
  file,
  isLoading,
  handleFileChange,
  removeFile,
}: {
  file: File | null
  isLoading: boolean
  handleFileChange: (files: FileList | null) => void
  removeFile: () => void
}) => {
  const { t } = useI18n()
  
  return (
    <>
      <div className="relative flex min-h-[250px] w-full flex-col items-center justify-center">
        {!file && (
          <FileDropUpload
            className="w-full flex-1"
            onSelectFile={handleFileChange}
          />
        )}

        {file && (
          <div className="relative flex w-full flex-1 items-center justify-center rounded-sm border border-slate-300 p-2">
            <img
              src={URL.createObjectURL(file)}
              alt={t('watermarkProcessor.fileAlt')}
              className="max-h-[200px] w-full flex-1 object-contain"
            />
            <button
              className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              disabled={isLoading}
              aria-label={t('watermarkProcessor.removeFile')}
            >
              x
            </button>
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
  handleUrl,
  removeImageUrl,
  handleImageError,
}: {
  imageUrl: string
  isLoading: boolean
  previewError: boolean
  handleUrl: (url: string) => void
  removeImageUrl: () => void
  handleImageError: () => void
}) => {
  const { t } = useI18n()
  const [url, setUrl] = useState(imageUrl)
  return (
    <div className="flex min-h-[250px] w-full">
      {!imageUrl && (
        <form className="flex w-full flex-col" onSubmit={() => handleUrl(url)}>
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
            className="mt-2 disabled:opacity-50"
          >
            {t('common.buttons.submit')}
          </Button>
        </form>
      )}
      {imageUrl && !previewError && (
        <div className="relative flex w-full flex-1 items-center justify-center rounded-sm border border-slate-300 p-2">
          <img
            src={imageUrl}
            alt={t('watermarkProcessor.previewAlt')}
            className="max-h-[200px] w-full flex-1 object-contain"
            onError={handleImageError}
          />
          <button
            className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:opacity-50"
            onClick={removeImageUrl}
            disabled={isLoading}
            aria-label={t('watermarkProcessor.removeImage')}
          >
            x
          </button>
        </div>
      )}
      {imageUrl && previewError && (
        <div className="mt-2 rounded-lg border border-slate-800 bg-neutral-900 p-4 text-yellow-400">
          <p>
            {t('watermarkProcessor.previewError.message')}
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            {t('watermarkProcessor.previewError.suggestion')}
          </p>
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
    <div className="min-h-[250px] w-full">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <h3 className="mb-1 font-display text-lg">{t('watermarkProcessor.original')}</h3>
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
          <h3 className="mb-1 font-display text-lg">{t('watermarkProcessor.processed')}</h3>
          <img
            src={result.processedImage}
            alt={t('watermarkProcessor.processedAlt')}
            className="w-full rounded-lg object-contain"
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <Button
          onClick={handleDownload}
          download="processed-image.jpg"
          className="w-full"
          color="slate"
        >
          {t('watermarkProcessor.buttons.download')}
        </Button>
        <Button
          onClick={resetImage}
          download="processed-image.jpg"
          className="w-full"
          color="slate"
          variant="outline"
        >
          {t('watermarkProcessor.buttons.processAnother')}
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
        throw new Error(`${t('watermarkProcessor.errors.fetchFailed')}: ${response.status}`)
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
              t('watermarkProcessor.errors.invalidUrl')
            )
          }

          const result = await fetchImageAsBase64(imageUrl)
          base64 = result.base64
          contentType = result.contentType
        } catch (err) {
          console.error('URL processing error:', err)
          throw new Error(
            `${t('watermarkProcessor.errors.urlAccess')} ${err instanceof Error ? err.message : ''} ${t('watermarkProcessor.errors.tryDirectUpload')}`
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
        throw new Error(`${t('watermarkProcessor.errors.apiError')}: ${response.status}`)
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
      setError(err instanceof Error ? err.message : t('watermarkProcessor.errors.unknown'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageError = () => {
    setPreviewError(true)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mb-2 flex w-full gap-4">
        <Button
          onClick={() => {
            setInputMethod('file')
            setImageUrl('')
            setError(null)
          }}
          className="flex-1"
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
          className="flex-1"
          color={inputMethod === 'url' ? 'blue' : 'slate'}
          variant={inputMethod === 'url' ? 'solid' : 'outline'}
        >
          {t('watermarkProcessor.buttons.imageUrl')}
        </Button>
      </div>

      {!result ? (
        inputMethod === 'file' ? (
          <FileUploadTab
            file={file}
            isLoading={isLoading}
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
          <Button
            onClick={processImage}
            disabled={isLoading}
            color="blue"
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {t('watermarkProcessor.processing')}
              </div>
            ) : (
              t('watermarkProcessor.buttons.removeWatermark')
            )}
          </Button>
        )}

      {result && (
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
