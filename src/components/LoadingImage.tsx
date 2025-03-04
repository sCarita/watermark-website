import clsx from 'clsx'

import '@/styles/loadingImage.css'

const LoadingImage = ({ className }: { className?: string }) => {
  return <div className={clsx('loading-image-loader', className)}></div>
}

export default LoadingImage
