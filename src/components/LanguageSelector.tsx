'use client'

import { Fragment } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useI18n } from '@/hooks/useI18n'

interface LanguageSelectorProps {
  variant?: 'light' | 'dark'
}

export function LanguageSelector({ variant = 'light' }: LanguageSelectorProps) {
  const { t, i18n, changeLanguage } = useI18n()
  
  const languages = [
    { code: 'en', name: t('common.language.en') },
    { code: 'es', name: t('common.language.es') },
    { code: 'fr', name: t('common.language.fr') }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode)
  }
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton 
        className={clsx(
          "inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset",
          variant === 'light' 
            ? "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50" 
            : "bg-slate-800 text-white ring-slate-700 hover:bg-slate-700"
        )}
      >
        {currentLanguage.name}
        <ChevronDownIcon 
          className={clsx(
            "-mr-1 h-5 w-5", 
            variant === 'light' ? "text-gray-400" : "text-slate-400"
          )} 
          aria-hidden="true" 
        />
      </MenuButton>
      
      <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((language) => (
            <MenuItem key={language.code} as={Fragment}>
              {({ active }) => (
                <button
                  onClick={() => handleLanguageChange(language.code)}
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                    language.code === currentLanguage.code ? 'font-medium' : 'font-normal'
                  )}
                >
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