import Image from 'next/image'
import React from 'react'

type LogoProps = Omit<
  React.ComponentPropsWithoutRef<typeof Image>,
  'width' | 'height' | 'src' | 'alt'
> & {
  light?: boolean
}

export function Logo({ light, ...props }: LogoProps) {
  return (
    <div className="inline-flex items-center">
      <Image
        src="/images/logo.svg"
        alt="clear.photo"
        width={32}
        height={32}
        {...props}
      />
      <div className="ml-1.5 text-xl font-bold">
        <span className={light ? 'text-white' : 'text-slate-900'}>clear.</span>
        <span className="text-blue-600">photo</span>
      </div>
    </div>
  )
}
