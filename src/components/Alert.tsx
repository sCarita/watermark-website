import React from 'react'
import clsx from 'clsx'
type AlertType = 'error' | 'success' | 'info' | 'warning'

interface AlertProps {
  type: AlertType
  message?: string
  className?: string
}

const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  const alertStyles = {
    error: {
      bgColor: 'bg-red-200',
      textColor: 'text-red-600',
      iconColor: 'bg-red-600',
      defaultMessage: 'Uh oh, something went wrong',
      iconPath: (
        <>
          <g clipPath="url(#clip0_961_15656)">
            <path
              d="M6 0.337494C2.86875 0.337494 0.3375 2.86874 0.3375 5.99999C0.3375 9.13124 2.86875 11.6812 6 11.6812C9.13125 11.6812 11.6813 9.13124 11.6813 5.99999C11.6813 2.86874 9.13125 0.337494 6 0.337494ZM6 10.8375C3.3375 10.8375 1.18125 8.66249 1.18125 5.99999C1.18125 3.33749 3.3375 1.18124 6 1.18124C8.6625 1.18124 10.8375 3.35624 10.8375 6.01874C10.8375 8.66249 8.6625 10.8375 6 10.8375Z"
              fill="white"
            />
            <path
              d="M7.725 4.25625C7.55625 4.0875 7.29375 4.0875 7.125 4.25625L6 5.4L4.85625 4.25625C4.6875 4.0875 4.425 4.0875 4.25625 4.25625C4.0875 4.425 4.0875 4.6875 4.25625 4.85625L5.4 6L4.25625 7.14375C4.0875 7.3125 4.0875 7.575 4.25625 7.74375C4.33125 7.81875 4.44375 7.875 4.55625 7.875C4.66875 7.875 4.78125 7.8375 4.85625 7.74375L6 6.6L7.14375 7.74375C7.21875 7.81875 7.33125 7.875 7.44375 7.875C7.55625 7.875 7.66875 7.8375 7.74375 7.74375C7.9125 7.575 7.9125 7.3125 7.74375 7.14375L6.6 6L7.74375 4.85625C7.89375 4.6875 7.89375 4.425 7.725 4.25625Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_961_15656">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </>
      ),
    },
    success: {
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
      iconColor: 'bg-green-600',
      defaultMessage: 'Success! Everything went well.',
      iconPath: (
        <path
          d="M4.5 6.5L6 8L9 5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    info: {
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-600',
      iconColor: 'bg-blue-600',
      defaultMessage: 'For your information.',
      iconPath: (
        <path
          d="M6 2V6M6 8H6.01"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    warning: {
      bgColor: 'bg-yellow-200',
      textColor: 'text-yellow-600',
      iconColor: 'bg-yellow-600',
      defaultMessage: 'Warning! Check this out.',
      iconPath: (
        <path
          d="M6 1L11 10H1L6 1ZM6 4V6M6 8H6.01"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
  }

  const { bgColor, textColor, iconColor, defaultMessage, iconPath } =
    alertStyles[type]

  return (
    <div
      className={clsx(
        `${bgColor} inline-flex rounded-lg px-[18px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]`,
        className,
      )}
    >
      <p className={`flex items-center text-sm font-medium ${textColor}`}>
        <span
          className={`${iconColor} mr-3 flex h-5 w-5 items-center justify-center rounded-full`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {iconPath}
          </svg>
        </span>
        {message || defaultMessage}
      </p>
    </div>
  )
}

export default Alert
