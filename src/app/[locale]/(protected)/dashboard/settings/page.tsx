'use client'

import { useState } from 'react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useAuthOperations } from '@/hooks/useAuthOperations'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings')
  const { user } = useAuth()
  const { changePassword, loading, error, setError } = useAuthOperations()

  const [isOpen, setIsOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState('')

  // Form validation errors
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset all errors
    setError(null)
    setSuccess('')
    setCurrentPasswordError('')
    setConfirmPasswordError('')

    // Simple validations
    let isValid = true

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(t('passwordsDoNotMatch'))
      isValid = false
    }

    if (!isValid) return

    const result = await changePassword(currentPassword, newPassword)

    if (result.success) {
      setSuccess(t('passwordUpdated'))
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // Close dialog after successful update
      setTimeout(() => {
        setIsOpen(false)
        setSuccess('')
      }, 2000)
    } else {
      // Map Firebase error codes to specific field errors
      if (result.error === 'auth/wrong-password') {
        setCurrentPasswordError(t('incorrectPassword'))
      }
    }
  }

  const resetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setError(null)
    setSuccess('')
    setCurrentPasswordError('')
    setConfirmPasswordError('')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-slate-900 p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">{t('title')}</h1>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {t('preferences')}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{t('language')}</h3>
                  <p className="text-sm text-slate-400">
                    {t('languageDescription')}
                  </p>
                </div>
                <LanguageSelector variant="dark" />
              </div>
            </div>
          </div>

          {user?.providerData?.[0]?.providerId === 'password' && (
            <div className="border-t border-slate-800 pt-6">
              <h2 className="mb-4 text-xl font-semibold text-white">
                {t('security')}
              </h2>
              <div className="space-y-4">
                <div>
                  <Dialog
                    open={isOpen}
                    onOpenChange={(open) => {
                      setIsOpen(open)
                      if (!open) resetForm()
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="white">{t('changePassword')}</Button>
                    </DialogTrigger>
                    <DialogContent className="border-slate-600 bg-slate-900 text-white">
                      <DialogHeader>
                        <DialogTitle>{t('changePassword')}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          {t('changePasswordDescription')}
                        </DialogDescription>
                      </DialogHeader>

                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            {t('currentPassword')}
                          </Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`border-slate-700 bg-slate-800 ${currentPasswordError ? 'border-red-500' : ''}`}
                            required
                          />
                          {currentPasswordError && (
                            <p className="text-sm text-red-500">
                              {currentPasswordError}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">
                            {t('newPassword')}
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`border-slate-700 bg-slate-800`}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            {t('confirmPassword')}
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`border-slate-700 bg-slate-800 ${confirmPasswordError ? 'border-red-500' : ''}`}
                            required
                          />
                          {confirmPasswordError && (
                            <p className="text-sm text-red-500">
                              {confirmPasswordError}
                            </p>
                          )}
                        </div>

                        {error && (
                          <p className="text-sm text-red-500">{error}</p>
                        )}
                        {success && (
                          <p className="text-sm text-green-500">{success}</p>
                        )}

                        <DialogFooter className="flex items-center gap-2">
                          {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              resetForm()
                              setIsOpen(false)
                            }}
                            className="border-slate-700 text-white hover:bg-slate-800 hover:text-white"
                            disabled={loading}
                          >
                            {t('cancel')}
                          </Button>

                          <Button
                            variant="blue"
                            type="submit"
                            disabled={loading}
                          >
                            {t('update')}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-slate-800 pt-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              {t('dangerZone')}
            </h2>
            <div>
              <Button variant="destructive">{t('deleteAccount')}</Button>
              <p className="mt-2 text-sm text-slate-400">
                {t('deleteWarning')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
