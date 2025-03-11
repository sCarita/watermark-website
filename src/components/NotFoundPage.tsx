import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations()

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label={t('errors.notFound.title')}>
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">
        {t('errors.notFound.code')}
      </p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        {t('errors.notFound.title')}
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        {t('errors.notFound.message')}
      </p>
      <Button href="/" className="mt-10">
        {t('common.back')}
      </Button>
    </SlimLayout>
  )
}
