import { useEffect, useRef, useState } from 'react'

interface MaskEditorProps {
  image: string
  onMaskChange?: (maskData: ImageData) => void
}

const MaskEditor: React.FC<MaskEditorProps> = ({ image, onMaskChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(20)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setContext(ctx)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Load and draw the initial image
    const img = new Image()
    img.src = image
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Create a separate layer for the mask
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(255, 255, 255, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [image])

  const getScaledCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 }

    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return

    setIsDrawing(true)
    const { x, y } = getScaledCoordinates(e)

    context.beginPath()
    context.moveTo(x, y)
    context.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    context.lineWidth = brushSize
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return

    const { x, y } = getScaledCoordinates(e)

    context.lineTo(x, y)
    context.stroke()

    if (onMaskChange) {
      const maskData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      )
      onMaskChange(maskData)
    }
  }

  const stopDrawing = () => {
    if (!context) return
    setIsDrawing(false)
    context.closePath()
  }

  const clearMask = () => {
    if (!context || !canvasRef.current) return

    const img = new Image()
    img.src = image
    img.onload = () => {
      if (!context || !canvasRef.current) return
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      context.drawImage(img, 0, 0)
    }
  }

  return (
    <div className="mask-editor">
      <div className="controls">
        <label>
          Brush Size:
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          {brushSize}px
        </label>
        <button onClick={clearMask}>Clear Mask</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: '1px solid #ccc',
          cursor: 'crosshair',
          width: '100%',
        }}
      />
    </div>
  )
}

export default MaskEditor
