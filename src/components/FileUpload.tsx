'use client'

import { useRef, useState } from 'react'

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ originalImage: string; processedImage: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setResult(null)
      setError(null)
    }
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

  const processImage = async () => {
    if (!file) return

    try {
      setIsLoading(true)
      setError(null)
      
      // Convert the file to base64
      const base64 = await convertToBase64(file)
      
      // Call the API
      const response = await fetch('https://processwatermark-k677kyuleq-uc.a.run.app/processWatermark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            imageBase64: base64
          }
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      // Assuming the API returns the processed image as base64
      setResult({
        originalImage: `data:${file.type};base64,${base64}`,
        processedImage: `data:${file.type};base64,${data.processedImageBase64 || data.data?.processedImageBase64}`
      })
    } catch (err) {
      console.error('Error processing image:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <button
          disabled={!!file}
          onClick={() => !file && fileInputRef.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-slate-800 bg-neutral-950 p-4 text-4xl text-neutral-400 transition-colors duration-500 hover:bg-neutral-800 disabled:bg-neutral-950"
        >
          {!file && <span>Upload image</span>}
          {file && <span>{file?.name}</span>}
        </button>

        {file && (
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
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {file && !result && (
        <button
          onClick={processImage}
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Processing...' : 'Remove Watermark'}
        </button>
      )}

      {error && (
        <div className="w-full rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-lg font-medium">Original</h3>
            <img 
              src={result.originalImage} 
              alt="Original" 
              className="max-h-[300px] w-full rounded-lg object-contain"
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
      )}
    </div>
  )
}
