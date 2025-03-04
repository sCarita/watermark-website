import clsx from 'clsx'
import '@/styles/loadingBar.css'

const LoadingBar = ({
  className,
  progress = 0,
}: {
  className?: string
  progress: number
}) => {
  return (
    <div className={clsx('loading-bar-loader', className)}>
      <div className="loading-bar-background">
        <div
          className="loading-bar"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        >
          <div className="white-bars-container">
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingBar
