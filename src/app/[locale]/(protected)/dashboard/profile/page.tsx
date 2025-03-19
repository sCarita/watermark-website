'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, User2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAuthOperations } from '@/hooks/useAuthOperations'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
export default function ProfilePage() {
  const t = useTranslations('dashboard.profile')

  const { user } = useAuth()
  const { updateUser, loading, error, setError } = useAuthOperations()
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName)
    }
  }, [user])

  useEffect(() => {
    const toastId = 'saving-profile'
    if (error) {
      toast.error(error, { id: toastId })
    }

    return () => {
      toast.dismiss(toastId)
      setError(null)
    }
  }, [error])

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (displayName !== user?.displayName) {
      await updateUser(displayName)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-slate-900 p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">{t('title')}</h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800">
              <User2 className="h-12 w-12 text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {user?.displayName}
              </h2>
              <p className="text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h3 className="mb-4 text-lg font-medium text-white">
              {t('personalInfo')}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">
                  {t('fullName')}
                </label>
                <Input
                  type="text"
                  className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">
                  {t('email')}
                </label>
                <Input
                  type="email"
                  className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                  defaultValue={user?.email || ''}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            <Button type="submit" variant="blue" disabled={loading}>
              {t('saveChanges')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
