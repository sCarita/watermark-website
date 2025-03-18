// Document Types
export type RunHistoryDoc = {
  id: string
  inputData: {
    imageBase64: string
    ipAddress: string
    isPublic: boolean
    mode: string
    modelRef: string // Firebase reference path
  }
  outputData: {
    inpaintedImageUrl: string
    maskBase64: string
  }
  processingTimeMs: number
  runType: string
  status: string
  timestamp: string
  userRef: string // Firebase reference path
}

// Function Input/Output Types
export type ManualMaskWatermarkInput = {
  version: string
  imageBase64: string
  maskBase64?: string
}

export type AutoMaskWatermarkInput = {
  version: string
  imageBase64: string
}

export type WatermarkProcessOutput = {
  success: boolean
  inpaintedImageUrl?: string
}
