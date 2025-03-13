import { Button } from './Button'
import { useTranslations } from 'next-intl'

interface ProcessResult {
  originalImage: string
  processedImage: string
  maskImage?: string
}

interface ProcessedImageResultProps {
  result: ProcessResult
  setError: (error: string) => void
  resetImage: () => void
}

export const ProcessedImageResult = ({
  result,
  setError,
  resetImage,
}: ProcessedImageResultProps) => {
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
