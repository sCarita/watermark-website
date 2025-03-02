'use client'

import { Fragment } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useI18n } from '@/hooks/useI18n'

interface LanguageSelectorProps {
  variant?: 'light' | 'dark'
}

// Simplified flag components
const EnglishFlag = () => (
  <div className="inline-block mr-2 overflow-hidden" style={{ width: '16px', height: '12px' }}>
    <div className="w-full h-full relative">
      {/* UK Part (bottom-right) */}
      <div className="absolute inset-0 bg-[#012169]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to bottom right, transparent calc(50% - 1px), white calc(50% - 1px), white calc(50% + 1px), transparent calc(50% + 1px))'
        }}></div>
        <div className="absolute" style={{ 
          top: '50%', left: 0, right: 0, height: '1px',
          transform: 'translateY(-50%)', 
          backgroundColor: 'white' 
        }}></div>
        <div className="absolute" style={{ 
          left: '50%', top: 0, bottom: 0, width: '1px',
          transform: 'translateX(-50%)', 
          backgroundColor: 'white' 
        }}></div>
      </div>
      
      {/* USA Part (top-left) */}
      <div className="absolute inset-0" style={{
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
      }}>
        {/* Stripes - horizontal */}
        <div className="absolute top-0 left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[8.3%] left-0 right-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[16.6%] left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[24.9%] left-0 right-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[33.2%] left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[41.5%] left-0 right-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[49.8%] left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[58.1%] left-0 right-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[66.4%] left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[74.7%] left-0 right-0 h-[8.3%] bg-white"></div>
        <div className="absolute top-[83.0%] left-0 right-0 h-[8.3%] bg-[#B31942]"></div>
        <div className="absolute top-[91.3%] left-0 right-0 h-[8.7%] bg-white"></div>
        
        {/* Blue canton with star */}
        <div className="absolute top-0 left-0 w-[40%] h-[41.5%] bg-[#002868] flex items-center justify-center">
          <div className="text-white text-[6px] font-bold">★</div>
        </div>
      </div>
      
      {/* Diagonal divider line */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(to bottom right, transparent calc(50% - 0.5px), white calc(50% - 0.5px), white calc(50% + 0.5px), transparent calc(50% + 0.5px))'
      }}></div>
    </div>
  </div>
)

const SpainFlag = () => (
  <div className="inline-block mr-2 overflow-hidden" style={{ width: '16px', height: '12px' }}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-[#c60b1e]"></div>
      <div className="absolute left-0 right-0 bg-[#ffc400]" style={{ top: '33%', height: '33%' }}></div>
    </div>
  </div>
)

const FranceFlag = () => (
  <div className="inline-block mr-2 overflow-hidden" style={{ width: '16px', height: '12px' }}>
    <div className="w-full h-full flex">
      <div className="h-full w-1/3 bg-[#002395]"></div>
      <div className="h-full w-1/3 bg-white"></div>
      <div className="h-full w-1/3 bg-[#ED2939]"></div>
    </div>
  </div>
)

export function LanguageSelector({ variant = 'light' }: LanguageSelectorProps) {
  const { t, i18n, changeLanguage } = useI18n()
  
  const languages = [
    { code: 'en', name: t('common.language.en'), flag: EnglishFlag },
    { code: 'es', name: t('common.language.es'), flag: SpainFlag },
    { code: 'fr', name: t('common.language.fr'), flag: FranceFlag }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode)
  }
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton 
        className={clsx(
          "inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset",
          variant === 'light' 
            ? "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50" 
            : "bg-slate-800 text-white ring-slate-700 hover:bg-slate-700"
        )}
      >
        <currentLanguage.flag />
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
                    'block w-full px-4 py-2 text-left text-sm flex items-center',
                    language.code === currentLanguage.code ? 'font-medium' : 'font-normal'
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