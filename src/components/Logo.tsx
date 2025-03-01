import React from 'react'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="flex items-center">
      <svg 
        aria-hidden="true" 
        viewBox="0 0 40 40" 
        className="h-10 w-10 mr-2"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
          fill="#2563EB"
        />
      </svg>
      <div className="font-bold text-xl">
        <span className="text-slate-900">clear.</span>
        <span className="text-blue-600">photo</span>
      </div>
    </div>
  )
}
