'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'

interface UserWithCredits extends User {
  paidCredits?: number
  freeCredits?: number
  apiKey?: string
}

export const AuthContext = createContext<{
  user: UserWithCredits | null
  loading: boolean
  credits: number
  apiKey: string | null
}>({
  user: null,
  loading: true,
  credits: 0,
  apiKey: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithCredits | null>(null)
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState(0)
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setCredits(doc.data()?.freeCredits + doc.data()?.paidCredits || 0)
          setApiKey(doc.data()?.apiKey || null)
        }
      })

      return () => unsubscribe()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, credits, apiKey }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
