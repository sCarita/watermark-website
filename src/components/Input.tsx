import clsx from 'clsx'
import React from 'react'

interface InputProps {
  type: string
  value: string
  placeholder: string
  className: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  value,
  placeholder,
  className,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={clsx(
        'border-stroke focus:border-primary active:border-primary disabled:bg-gray-2 disabled:border-gray-2 w-full rounded-md border border-slate-200 bg-transparent px-5 py-[10px] text-slate-600 transition outline-none disabled:cursor-default',
        className,
      )}
      onChange={onChange}
    />
  )
}

export default Input
