import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/contexts/AuthContext'

export interface UserData {
  tokenBalance: number
}

export function useUserData() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) {
      setUserData(null)
      setLoading(false)
      return
    }

    const userRef = doc(db, 'users', user.uid)

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData)
        } else {
          setUserData(null)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching user data:', error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [user?.uid])

  return { userData, loading }
}
