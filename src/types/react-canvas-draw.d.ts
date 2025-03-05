declare module 'react-canvas-draw' {
  import { Component } from 'react'

  export interface CanvasDrawProps {
    onChange?: (e: any) => void
    loadTimeOffset?: number
    lazyRadius?: number
    brushRadius?: number
    brushColor?: string
    catenaryColor?: string
    gridColor?: string
    backgroundColor?: string
    hideGrid?: boolean
    canvasWidth?: number
    canvasHeight?: number
    disabled?: boolean
    imgSrc?: string
    saveData?: string
    immediateLoading?: boolean
    hideInterface?: boolean
    className?: string
  }

  export default class CanvasDraw extends Component<CanvasDrawProps> {
    eraseAll(): void
    canvas: {
      drawing: HTMLCanvasElement
      grid: HTMLCanvasElement
    }
  }
}
