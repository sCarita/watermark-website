import { DocumentReference } from 'firebase/firestore'

// Document Types
export type RunHistoryDoc = {
  id: string
  inputData: {
    imageBase64: string
    ipAddress: string
    isPublic: boolean
    mode: string
    modelRef: string
  }
  outputData: {
    inpaintedImageUrl: string
    maskBase64: string
  }
  processingTimeMs: number
  runType: string
  status: string
  timestamp: string
  userRef: string
}

export type Model = {
  id: string
  name: string
  procedureRef: DocumentReference<AvailableProcedure>
  basePrice: number
  inputFields: {
    auto?: InputFields
    manual?: InputFields
    boosted?: InputFields
  }
  details: Record<string, any>
  createdAt: string
  updatedAt: string
  version: string
}

export type InputField = {
  name: string
  type: 'slider' | 'text' | 'file' | 'number' | 'options' | 'boolean'
  label: string
  description?: string
  placeholder?: string
  defaultValue?: any
  options?: {
    min?: string
    max?: string
    maxSize?: string
    formats?: string[]
    values?: string[]
  }
}

export type InputFields = {
  label: string
  name: string
  fields?: InputField[]
}

type AvailableProcedure = any

export type Transaction = {
  createdAt: string
  freeAmount: number
  paidAmount: number
  type: TransactionType
  userRef: string
  status: TransactionStatus
}

type TransactionType = 'airdrop' | 'buy' | 'restitution' | 'penalty' | 'spend'
type TransactionStatus = 'pending' | 'completed' | 'failed'

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

export type UpdateUserProfileInput = {
  displayName: string
}

export type UpdateUserProfileOutput = {
  success: boolean
}

export type CreateCheckoutSessionInput = {
  priceId: string
  successUrl: string
  cancelUrl: string
}

export type CreateCheckoutSessionOutput = {
  sessionId: string
}
