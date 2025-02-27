'use client'

import React, { useRef, useState } from 'react'

interface ImageComparisonSliderProps {
  originalImage: string
  processedImage: string
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  originalImage,
  processedImage,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <img
        src={originalImage}
        alt="Original"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <img
        src={processedImage}
        alt="Processed"
        className="absolute left-0 top-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        step="0.5"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute bottom-0 left-0 h-full w-full appearance-none"
        style={{ zIndex: 10 }}
      />
      <div
        className="absolute bottom-0 top-0"
        style={{
          left: `${sliderPosition}%`,
          width: '0px',
          borderLeft: '1px dashed white',
          zIndex: 5,
        }}
      />
      <span
        className="pointer-events-none absolute bottom-0 top-1/2 z-20 ml-[-1px] mt-[-14px] flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center leading-[0] text-gray-400"
        style={{
          left: `${sliderPosition}%`,
        }}
      >
        <span className="text-sm font-bold">&lt; &gt;</span>
      </span>
      {/* <div
        className="absolute z-20 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-400"
        style={{
          left: `${sliderPosition}%`,
          top: '50%',
        }}
      /> */}

      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          width: calc(100% + 30px);
          height: 100%;
          background: transparent;
          left: -15px;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 30px;
          height: 30px;
          background: #eee;
          border-radius: 50%;
          cursor: grab;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }

        input[type='range']::-moz-range-thumb {
          width: 30px;
          height: 30px;
          background: #eee;
          border-radius: 50%;
          cursor: grab;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  )
}

export default ImageComparisonSlider
