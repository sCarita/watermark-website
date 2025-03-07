'use client'

import { Fragment } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useI18n } from '@/hooks/useI18n'
import { usePathname, useRouter } from 'next/navigation'

interface LanguageSelectorProps {
  variant?: 'light' | 'dark'
  direction?: 'top end' | 'top start' | 'bottom end' | 'bottom start'
}

// Simplified flag components
const EnglishFlag = () => (
  <div
    className="inline-block overflow-hidden"
    style={{ width: '16px', height: '12px' }}
  >
    <div className="relative h-full w-full">
      {/* UK Part (bottom-right) */}
      <div className="absolute inset-0 bg-[#012169]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, transparent calc(50% - 1px), white calc(50% - 1px), white calc(50% + 1px), transparent calc(50% + 1px))',
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
          }}
        ></div>
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
          }}
        ></div>
      </div>

      {/* USA Part (top-left) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }}
      >
        {/* Stripes - horizontal */}
        <div className="absolute top-0 right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[8.3%] right-0 left-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[16.6%] right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[24.9%] right-0 left-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[33.2%] right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[41.5%] right-0 left-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[49.8%] right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[58.1%] right-0 left-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[66.4%] right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[74.7%] right-0 left-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[83.0%] right-0 left-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[91.3%] right-0 left-0 h-[8.7%] bg-white"></div>

        {/* Blue canton with star */}
        <div className="absolute top-0 left-0 flex h-[41.5%] w-[40%] items-center justify-center bg-[#002868]">
          <div className="text-[6px] font-bold text-white">★</div>
        </div>
      </div>

      {/* Diagonal divider line */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom right, transparent calc(50% - 0.5px), white calc(50% - 0.5px), white calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        }}
      ></div>
    </div>
  </div>
)

const SpainFlag = () => (
  <div
    className="inline-block overflow-hidden"
    style={{ width: '16px', height: '12px' }}
  >
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[#c60b1e]"></div>
      <div
        className="absolute right-0 left-0 bg-[#ffc400]"
        style={{ top: '33%', height: '33%' }}
      ></div>
    </div>
  </div>
)

const FranceFlag = () => (
  <div
    className="inline-block overflow-hidden"
    style={{ width: '16px', height: '12px' }}
  >
    <div className="flex h-full w-full">
      <div className="h-full w-1/3 bg-[#002395]"></div>
      <div className="h-full w-1/3 bg-white"></div>
      <div className="h-full w-1/3 bg-[#ED2939]"></div>
    </div>
  </div>
)

export function LanguageSelector({
  variant = 'light',
  direction,
}: LanguageSelectorProps) {
  const { t, i18n, changeLanguage } = useI18n()
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: 'en', name: t('common.language.en'), flag: EnglishFlag },
    { code: 'es', name: t('common.language.es'), flag: SpainFlag },
    { code: 'fr', name: t('common.language.fr'), flag: FranceFlag },
  ]

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    // Update language and set cookie
    changeLanguage(languageCode)
    document.cookie = `i18nextLng=${languageCode}; path=/; max-age=31536000`

    // Helper to construct the new path
    const getNewPath = () => {
      const isRoot = pathname === '/' || /^\/[a-z]{2}$/.test(pathname || '')
      const hasLocale = /^\/[a-z]{2}\//.test(pathname || '')
      const isBlogArticle = /^\/[a-z]{2}\/blog\/[^/]+$/.test(pathname || '')

      if (isRoot) {
        return `/${languageCode}`
      }

      if (isBlogArticle) {
        // For blog articles, redirect to the blog page in the new language
        return `/${languageCode}/blog`
      }

      if (hasLocale) {
        return pathname?.replace(/^\/[a-z]{2}\//, `/${languageCode}/`)
      }

      return `/${languageCode}${pathname}`
    }

    router.push(getNewPath())
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className={clsx(
          'inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset',
          variant === 'light'
            ? 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
            : 'bg-slate-800 text-white ring-slate-700 hover:bg-slate-700',
        )}
      >
        <currentLanguage.flag />
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <ChevronDownIcon
          className={clsx(
            '-mr-1 h-5 w-5',
            variant === 'light' ? 'text-gray-400' : 'text-slate-400',
          )}
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor={direction}
        className={clsx(
          'ring-opacity-5 absolute right-0 z-10 mt-2 w-40 origin-top origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0',
          direction?.includes('top') && '-mt-4',
          direction?.includes('bottom') && 'mt-2',
        )}
      >
        <div className="py-1">
          {languages.map((language) => (
            <MenuItem key={language.code} as={Fragment}>
              {({ active }) => (
                <button
                  onClick={() => handleLanguageChange(language.code)}
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block flex w-full items-center gap-1.5 px-4 py-2 text-left text-sm',
                    language.code === currentLanguage.code
                      ? 'font-medium'
                      : 'font-normal',
                  )}
                >
                  <language.flag />
                  {language.name}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
