'use client'

import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'

interface ImageComparisonSliderProps {
  originalImage: string
  processedImage: string
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  originalImage,
  processedImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouching, setIsTouching] = useState(false)

  // Handle direct click and drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    setIsDragging(true)

    // Calculate slider position based on click position
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100))

    // Prevent default behavior to avoid text selection
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return

    setIsDragging(true)
    setIsTouching(true)

    // Calculate slider position based on touch position
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100))

    // Prevent default behavior to avoid scrolling
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    // Calculate slider position based on mouse position
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100))
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current || !e.touches[0]) return

    // Calculate slider position based on touch position
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    // Keep the touch state active for a short period to keep labels visible
    setTimeout(() => {
      setIsTouching(false)
    }, 3000)
  }

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  // Determine if labels should be visible
  const shouldShowLabels = isHovering || isDragging || isTouching

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Labels */}
      <div
        className="absolute top-4 left-4 z-20 rounded-full bg-black/40 px-3 py-1 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
        style={{ opacity: shouldShowLabels ? 0.9 : 0 }}
      >
        Before
      </div>
      <div
        className="absolute top-4 right-4 z-20 rounded-full bg-black/40 px-3 py-1 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
        style={{ opacity: shouldShowLabels ? 0.9 : 0 }}
      >
        After
      </div>

      {/* Images */}
      <Image
        src={originalImage}
        alt="Original"
        className="absolute top-0 left-0 h-full w-full object-cover"
        draggable="false"
        width={1300}
        height={900}
      />
      <Image
        src={processedImage}
        alt="Processed"
        className="absolute top-0 left-0 h-full w-full object-cover"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? 'none' : 'clip-path 0.1s ease-out',
        }}
        draggable="false"
        width={1300}
        height={900}
      />

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${sliderPosition}%`,
          width: isDragging || isHovering || isTouching ? '2px' : '1px',
          background:
            isDragging || isHovering || isTouching
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
              : 'rgba(255,255,255,0.5)',
          boxShadow:
            isDragging || isHovering || isTouching
              ? '0 0 8px rgba(0,0,0,0.3)'
              : 'none',
          zIndex: 5,
          transition: isDragging ? 'none' : 'all 0.1s ease-out',
        }}
      />

      {/* Slider handle */}
      <div
        className="absolute"
        style={{
          left: `${sliderPosition}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 15,
          opacity: isDragging || isHovering || isTouching ? 1 : 0.7,
          transition: isDragging ? 'none' : 'all 0.1s ease-out',
        }}
      >
        <div className="relative">
          <div
            className="absolute rounded-full"
            style={{
              width: isDragging || isHovering || isTouching ? '44px' : '36px',
              height: isDragging || isHovering || isTouching ? '44px' : '36px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              transform: 'translate(-50%, -50%)',
              boxShadow:
                isDragging || isHovering || isTouching
                  ? '0 0 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.3)'
                  : '0 0 10px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.2)',
              transition: isDragging ? 'none' : 'all 0.1s ease-out',
            }}
          />
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: isDragging || isHovering || isTouching ? '18px' : '14px',
              height: isDragging || isHovering || isTouching ? '18px' : '14px',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              transition: isDragging ? 'none' : 'all 0.1s ease-out',
            }}
          />

          {/* Arrows */}
          <div
            className="absolute"
            style={{
              opacity: isDragging || isHovering || isTouching ? 1 : 0,
              transform: 'translate(-50%, -50%)',
              transition: isDragging ? 'none' : 'all 0.1s ease-out',
            }}
          >
            <div className="flex items-center gap-[30px]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageComparisonSlider
