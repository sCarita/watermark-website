import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import {
  ManualMaskWatermarkInput,
  AutoMaskWatermarkInput,
  WatermarkProcessOutput,
  UpdateUserProfileOutput,
  UpdateUserProfileInput,
  CreateCheckoutSessionInput,
  CreateCheckoutSessionOutput,
  ListModelVersionsOutput,
  ListModelVersionsInput,
  RevokeUserApiKeyInput,
  RevokeUserApiKeyOutput,
  GenerateUserApiKeyOutput,
  GenerateUserApiKeyInput,
} from '@/types/firebase'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const functions = getFunctions(app, 'us-central1')
const db = getFirestore(app)

const processmanualmaskwatermark = httpsCallable<
  ManualMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'processManualMaskWatermark')

const processautomaskwatermark = httpsCallable<
  AutoMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'processAutoMaskWatermark')

const publicprocessmanualmaskwatermark = httpsCallable<
  ManualMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'publicProcessManualMaskWatermark')

const publicprocessautomaskwatermark = httpsCallable<
  AutoMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'publicProcessAutoMaskWatermark')

const updateUserProfile = httpsCallable<
  UpdateUserProfileInput,
  UpdateUserProfileOutput
>(functions, 'updateUserProfile')

const createCreditsPurchaseCheckout = httpsCallable<
  CreateCheckoutSessionInput,
  CreateCheckoutSessionOutput
>(functions, 'createCreditsPurchaseCheckout')

const listModelVersions = httpsCallable<
  ListModelVersionsInput,
  ListModelVersionsOutput
>(functions, 'listModelVersions')

const generateUserApiKey = httpsCallable<
  GenerateUserApiKeyInput,
  GenerateUserApiKeyOutput
>(functions, 'generateUserApiKey')

const revokeUserApiKey = httpsCallable<
  RevokeUserApiKeyInput,
  RevokeUserApiKeyOutput
>(functions, 'revokeUserApiKey')

export {
  app,
  auth,
  db,
  processmanualmaskwatermark,
  processautomaskwatermark,
  publicprocessmanualmaskwatermark,
  publicprocessautomaskwatermark,
  updateUserProfile,
  createCreditsPurchaseCheckout,
  listModelVersions,
  revokeUserApiKey,
  generateUserApiKey,
}
