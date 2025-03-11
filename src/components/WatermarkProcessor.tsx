'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import FileDropUpload from './FileDropUpload'
import Alert from './Alert'
import Badge from './Badge'
import Input from './Input'
import { useTranslations } from 'next-intl'
import LoadingBar from './LoadingBar'
import clsx from 'clsx'
import LoadingImage from './LoadingImage'
import CanvasDraw from 'react-canvas-draw'

import '@/styles/rangeSlider.css'
import ImageMaskEditor from './ImageMaskEditor'
import { Link } from '@/i18n/navigation'

const UploadImage = ({
  file,
  isLoading,
  progress,
  imageUrl,
  previewError,
  handleUrl,
  handleImageError,
  handleFileChange,
  removeImage,
}: {
  file: File | null
  imageUrl: string
  isLoading: boolean
  progress: number
  previewError: boolean
  handleUrl: (url: string) => void
  handleFileChange: (files: FileList | null) => void
  removeImage: () => void
  handleImageError: () => void
}) => {
  const t = useTranslations()
  const [url, setUrl] = useState(imageUrl)

  return (
    <>
      <div className="relative flex min-h-[300px] w-full flex-col items-center justify-center">
        {!file && !imageUrl && (
          <>
            <FileDropUpload
              className="w-full flex-1 !border-b-0"
              onSelectFile={handleFileChange}
            />

            <form
              className="mt-2 flex w-full flex-col items-center gap-1 rounded-md sm:flex-row"
              onSubmit={() => handleUrl(url)}
            >
              <span className="text-sm text-slate-600 sm:mr-1">
                {t('common.or')}
              </span>
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
          </>
        )}

        {(file || imageUrl) && !previewError && (
          <div className="relative flex w-full flex-1 items-center justify-center rounded-sm border border-slate-200 bg-black p-2">
            <img
              src={file ? URL.createObjectURL(file) : imageUrl}
              alt={t('watermarkProcessor.fileAlt')}
              className="max-h-[220px] w-full flex-1 object-contain"
              onError={handleImageError}
            />

            <button
              className="absolute -top-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                removeImage()
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

        {(imageUrl || file) && previewError && (
          <div className="relative flex h-full flex-col justify-center rounded-md border border-slate-800 bg-neutral-900 p-4 text-yellow-400">
            <p>{t('watermarkProcessor.previewError.message')}</p>
            <p className="mt-2 text-sm text-neutral-400">
              {t('watermarkProcessor.previewError.suggestion')}
            </p>
            <button
              className="absolute -top-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-500 hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
              onClick={removeImage}
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
    </>
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
  const t = useTranslations()

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
          <h3 className="mb-2 flex items-center gap-1 font-display text-2xl">
            <svg
              className="text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                color="currentColor"
              >
                <circle cx={7.5} cy={7.5} r={1.5}></circle>
                <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"></path>
                <path d="M5 21c4.372-5.225 9.274-12.116 16.498-7.458"></path>
              </g>
            </svg>
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
          <h3 className="mb-2 flex items-center gap-1 font-display text-2xl">
            <svg
              className="text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                color="currentColor"
              >
                <path d="M20.998 11q.002.705.002 1.5c0 4.478 0 6.718-1.391 8.109S15.979 22 11.5 22c-4.478 0-6.718 0-8.109-1.391S2 16.979 2 12.5c0-4.478 0-6.718 1.391-8.109S7.021 3 11.5 3q.795 0 1.5.002"></path>
                <path d="m18.5 2l.258.697c.338.914.507 1.371.84 1.704c.334.334.791.503 1.705.841L22 5.5l-.697.258c-.914.338-1.371.507-1.704.84c-.334.334-.503.791-.841 1.705L18.5 9l-.258-.697c-.338-.914-.507-1.371-.84-1.704c-.334-.334-.791-.503-1.705-.841L15 5.5l.697-.258c.914-.338 1.371-.507 1.704-.84c.334-.334.503-.791.841-1.705zm-14 19.5c4.372-5.225 9.274-12.116 16.498-7.458"></path>
              </g>
            </svg>
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
          className="flex w-full items-center gap-1"
          color="slate"
          variant="outline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#314158"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m10 7l-.516 1.394c-.676 1.828-1.014 2.742-1.681 3.409s-1.581 1.005-3.409 1.681L3 14l1.394.516c1.828.676 2.742 1.015 3.409 1.681s1.005 1.581 1.681 3.409L10 21l.516-1.394c.676-1.828 1.015-2.742 1.681-3.409s1.581-1.005 3.409-1.681L17 14l-1.394-.516c-1.828-.676-2.742-1.014-3.409-1.681s-1.005-1.581-1.681-3.409zm8-4l-.221.597c-.29.784-.435 1.176-.72 1.461c-.286.286-.678.431-1.462.72L15 6l.598.221c.783.29 1.175.435 1.46.72c.286.286.431.678.72 1.462L18 9l.221-.597c.29-.784.435-1.176.72-1.461c.286-.286.678-.431 1.462-.72L21 6l-.598-.221c-.783-.29-1.175-.435-1.46-.72c-.286-.286-.431-.678-.72-1.462z"
              color="#314158"
            ></path>
          </svg>
          {t('watermarkProcessor.buttons.processAnother')}
        </Button>
        <Button
          onClick={handleDownload}
          download="processed-image.jpg"
          className="flex w-full items-center gap-1"
          color="slate"
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
              d="M12 14.5v-10m0 10c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.008-1.994 2.5-2.5m5.5 4.5c0 2.482-.518 3-3 3H7c-2.482 0-3-.518-3-3"
              color="#fff"
            ></path>
          </svg>
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
  const t = useTranslations()

  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const [result, setResult] = useState<ProcessResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [previewError, setPreviewError] = useState<boolean>(false)

  const [imageMaskOpen, setImageMaskOpen] = useState(false)

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
    <>
      <div className="flex w-full flex-col gap-2">
        {(!result || isLoading) && (
          <UploadImage
            file={file}
            imageUrl={imageUrl}
            previewError={previewError}
            isLoading={isLoading}
            progress={progress}
            handleFileChange={handleFileChange}
            handleUrl={handleUrl}
            handleImageError={handleImageError}
            removeImage={() => {
              setFile(null)
              setImageUrl('')
              setResult(null)
              setError(null)
              setPreviewError(false)
            }}
          />
        )}

        {!file && !imageUrl && !result && (
          <div className="rounded-md bg-slate-100 p-3">
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
              <Link href="/terms" className="text-blue-600">
                {t('watermarkProcessor.termsOfUse')}
              </Link>{' '}
              {t('common.and')}{' '}
              <Link href="/privacy" className="text-blue-600">
                {t('watermarkProcessor.privacyPolicy')}
              </Link>
            </p>
          </div>
        )}

        {(file || imageUrl) && !result && (
          <div className="flex flex-col items-center gap-2 lg:flex-row-reverse">
            <Button
              onClick={processImage}
              disabled={isLoading}
              color="blue"
              className="flex w-full items-center gap-1.5 bg-linear-to-r from-sky-500 to-indigo-500 py-4 !text-lg whitespace-nowrap hover:from-indigo-500 hover:to-sky-500 disabled:pointer-events-none disabled:opacity-50"
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
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m13.926 12.778l-2.149-2.149c-.292-.293-.439-.439-.597-.517a1.07 1.07 0 0 0-.954 0c-.158.078-.304.224-.597.517s-.439.44-.517.597c-.15.301-.15.654 0 .954c.078.158.224.305.517.598l2.149 2.148m2.148-2.149l6.445 6.446c.293.292.439.439.517.597c.15.3.15.653 0 .954c-.078.157-.224.304-.517.597s-.44.439-.597.517c-.301.15-.654.15-.954 0c-.158-.078-.305-.224-.598-.517l-6.445-6.445m2.149-2.149l-2.149 2.149M17 2l.295.797c.386 1.044.58 1.566.96 1.947c.382.381.904.575 1.948.961L21 6l-.797.295c-1.044.386-1.566.58-1.947.96c-.381.382-.575.904-.961 1.948L17 10l-.295-.797c-.386-1.044-.58-1.566-.96-1.947c-.382-.381-.904-.575-1.948-.961L13 6l.797-.295c1.044-.386 1.566-.58 1.947-.96c.381-.382.575-.904.961-1.948zM6 4l.221.597c.29.784.435 1.176.72 1.461c.286.286.678.431 1.462.72L9 7l-.597.221c-.784.29-1.176.435-1.461.72c-.286.286-.431.678-.72 1.462L6 10l-.221-.597c-.29-.784-.435-1.176-.72-1.461c-.286-.286-.678-.431-1.462-.72L3 7l.597-.221c.784-.29 1.176-.435 1.461-.72c.286-.286.431-.678.72-1.462z"
                  color="#fff"
                />
              </svg>
              {t('watermarkProcessor.buttons.removeWatermark')}
            </Button>
            <div className="flex w-full flex-1 flex-col items-center gap-2 sm:flex-row">
              <Button
                className="flex w-full flex-1 items-center gap-1.5 py-4 whitespace-nowrap"
                color="slate"
                onClick={() => setImageMaskOpen(true)}
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
                    d="M9.31 9.378C10.8 7.773 22.01 11.705 22 13.14c-.01 1.628-4.378 2.128-5.588 2.468c-.728.204-.923.414-1.09 1.177c-.761 3.457-1.143 5.176-2.012 5.215c-1.387.061-5.455-11.055-4-12.622m10.368-1.726q.184.441.322.903m-1.937-3.47a9.2 9.2 0 0 0-2.422-1.94m-2.92-1.02a9.4 9.4 0 0 0-3.35.053M6.084 3.545a9.2 9.2 0 0 0-2.545 2.549M2.175 9.386a9.4 9.4 0 0 0-.046 3.361m1.015 2.894c.5.9 1.146 1.708 1.906 2.391m2.614 1.651q.434.18.89.317"
                    color="#fff"
                  ></path>
                </svg>
                {t('watermarkProcessor.buttons.manualSelection')}
              </Button>
            </div>
          </div>
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

      {(imageUrl || file) && (
        <ImageMaskEditor
          imageUrl={(file && URL.createObjectURL(file)) || imageUrl}
          dialogOpen={imageMaskOpen}
          toggleDialog={() => setImageMaskOpen(!imageMaskOpen)}
        />
      )}
    </>
  )
}
