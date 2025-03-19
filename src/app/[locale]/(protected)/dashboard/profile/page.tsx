import { Button } from '@/components/ui/button'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'

export default async function ProfilePage() {
  const t = await getTranslations('dashboard.profile')

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-slate-900 p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">{t('title')}</h1>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800">
              <span className="text-4xl text-slate-400">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">John Doe</h2>
              <p className="text-slate-400">john.doe@example.com</p>
              <Button variant="outline-blue" size="sm" className="mt-2">
                {t('changeAvatar')}
              </Button>
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
                <input
                  type="text"
                  className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">
                  {t('email')}
                </label>
                <input
                  type="email"
                  className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                  defaultValue="john.doe@example.com"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="blue">{t('saveChanges')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
