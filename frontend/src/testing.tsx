
interface DataLoaderProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  height?: string
  showMessage?: boolean
  className?: string
}


export function Testing({
  message = 'Loading data...',
  size = 'medium',
  height = 'h-64',
  showMessage = true,
  className = '',
}:DataLoaderProps){

const spinnerSizes = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-14 w-14',
  }
  return (
    <div className={`flex justify-center items-center ${height} ${className}`}>
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${spinnerSizes[size]} border-b-2 border-blue-500 mx-auto`}
        ></div>
        {showMessage && message && (
          <p className="mt-3 text-sm text-gray-500">{message}</p>
        )}
      </div>
    </div>
  )
}
