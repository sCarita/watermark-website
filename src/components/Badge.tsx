import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  outline?: boolean
  roundedFull?: boolean
  roundedLg?: boolean
  roundedNone?: boolean
  roundedSm?: boolean
  roundedMd?: boolean
  bgOpacity?: boolean
}

const Badge = ({
  children,
  outline,
  roundedFull,
  roundedLg,
  roundedNone,
  roundedSm,
  roundedMd,
  bgOpacity,
}: BadgeProps) => {
  return (
    <span
      className={`inline-block rounded px-2 py-1 text-xs font-medium select-none ${
        outline
          ? `border ${
              (roundedFull && `rounded-full`) ||
              (roundedLg && `rounded-lg`) ||
              (roundedNone && `rounded-none`) ||
              (roundedSm && `rounded-sm`) ||
              (roundedMd && `rounded-md`) ||
              (bgOpacity && `bg-slate-600/10`)
            } border-slate-600 text-slate-600`
          : `bg-slate-600 ${
              (roundedFull && `rounded-full`) ||
              (roundedLg && `rounded-lg`) ||
              (roundedNone && `rounded-none`) ||
              (roundedSm && `rounded-sm`) ||
              (roundedMd && `rounded-md`) ||
              (bgOpacity && `bg-slate-600/10`)
            } text-white`
      } ${bgOpacity && 'bg-slate-600/10'} `}
    >
      {children}
    </span>
  )
}

export default Badge
