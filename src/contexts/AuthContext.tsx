'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'

interface UserWithCredits extends User {
  paidTokenBalance?: number
  freeTokenBalance?: number
}

export const AuthContext = createContext<{
  user: UserWithCredits | null
  loading: boolean
  credits: number
}>({
  user: null,
  loading: true,
  credits: 0,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithCredits | null>(null)
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState(0)

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
          setCredits(
            doc.data()?.freeTokenBalance + doc.data()?.paidTokenBalance || 0,
          )
        }
      })

      return () => unsubscribe()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, credits }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
