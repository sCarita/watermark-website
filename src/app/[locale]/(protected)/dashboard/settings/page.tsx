import { LanguageSelector } from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Get translations
  const t = await getTranslations('dashboard.settings')

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

          <div className="border-t border-slate-800 pt-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              {t('security')}
            </h2>
            <div className="space-y-4">
              <div>
                <Button variant="white">{t('changePassword')}</Button>
              </div>
            </div>
          </div>

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
