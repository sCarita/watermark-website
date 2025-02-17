'use client'

import { useRef, useState } from 'react'

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  return (
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
          }}
        >
          x
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileUpload
