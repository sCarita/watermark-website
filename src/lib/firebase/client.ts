import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import {
  ManualMaskWatermarkInput,
  AutoMaskWatermarkInput,
  WatermarkProcessOutput,
} from '@/types/firebase'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Debug logging
console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : undefined,
})

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const functions = getFunctions(app, 'us-central1')
const db = getFirestore(app)

const processmanualmaskwatermark = httpsCallable<
  ManualMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'ProcessManualMaskWatermark')

const processautomaskwatermark = httpsCallable<
  AutoMaskWatermarkInput,
  WatermarkProcessOutput
>(functions, 'ProcessAutoMaskWatermark')

export { app, auth, processmanualmaskwatermark, processautomaskwatermark, db }
