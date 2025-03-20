import { useState } from 'react'
import { auth, updateUserProfile } from '@/lib/firebase/client'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutFirebase,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function useAuthOperations() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('auth.errors')

  const getAuthErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return t('invalidCredential')
      case 'auth/user-not-found':
        return t('userNotFound')
      case 'auth/wrong-password':
        return t('wrongPassword')
      case 'auth/email-already-in-use':
        return t('emailInUse')
      case 'auth/weak-password':
        return t('weakPassword')
      case 'auth/too-many-requests':
        return t('tooManyRequests')
      case 'auth/user-disabled':
        return t('userDisabled')
      case 'auth/network-request-failed':
        return t('networkFailed')
      default:
        return t('default')
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (
    email: string,
    password: string,
    userData: { name: string },
  ) => {
    try {
      setError(null)
      setLoading(true)

      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      // Update the user's profile
      await updateProfile(userCredential.user, {
        displayName: userData.name,
      })

      router.push('/')
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      setLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      setLoading(true)
      await signOutFirebase(auth)
      router.push('/login')
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (displayName: string) => {
    try {
      setError(null)
      setLoading(true)
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName })
        await updateUserProfile({ displayName })
      } else {
        throw new Error('No user is signed in')
      }
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      setError(null)
      setLoading(true)

      const user = auth.currentUser
      if (!user || !user.email) {
        throw new Error('No authenticated user found')
      }

      // Create credential with current password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      )

      // Reauthenticate user before changing password
      await reauthenticateWithCredential(user, credential)

      // Update password
      await updatePassword(user, newPassword)

      return { success: true }
    } catch (err: any) {
      // Handle specific Firebase auth errors
      if (err.code === 'auth/wrong-password') {
        setError('Current password is incorrect')
      } else if (err.code === 'auth/weak-password') {
        setError('New password is too weak')
      } else if (err.code === 'auth/requires-recent-login') {
        setError(
          'This operation requires recent authentication. Please log in again.',
        )
      } else {
        setError(getAuthErrorMessage(err.code))
      }
      return { success: false, error: err.code }
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async (password?: string) => {
    try {
      setError(null)
      setLoading(true)

      const user = auth.currentUser
      if (!user) {
        throw new Error('No authenticated user found')
      }

      // Re-authenticate user if they have password-based authentication
      if (user.providerData?.[0]?.providerId === 'password') {
        if (!password || !user.email) {
          throw new Error('Password is required to delete account')
        }

        // Create credential with current password
        const credential = EmailAuthProvider.credential(user.email, password)

        // Reauthenticate user
        await reauthenticateWithCredential(user, credential)
      }

      // Delete the user
      await user.delete()
      router.push('/login')

      return { success: true }
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setError('Current password is incorrect')
      } else if (err.code === 'auth/requires-recent-login') {
        setError(
          'This operation requires recent authentication. Please log in again.',
        )
      } else {
        setError(getAuthErrorMessage(err.code))
      }
      return { success: false, error: err.code }
    } finally {
      setLoading(false)
    }
  }

  return {
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUser,
    changePassword,
    deleteAccount,
    setError,
    error,
    loading,
  }
}
