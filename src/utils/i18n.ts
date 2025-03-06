import { useTranslation as useTranslationOriginal } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const useTranslation = () => useTranslationOriginal('common')

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
}) 