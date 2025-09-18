import { ArrowLeftIcon, HomeIcon, SearchIcon } from "lucide-react"
import { Link } from "react-router"

export function NotFound(){
  
  const goBack = () => {
    window.history.back()
  }


  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 rounded-full p-4">
            <SearchIcon size={48} className="text-blue-600" />
          </div>
        </div>
        <div className="text-5xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={goBack}
            className=" cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Go Back
          </button>
          <Link
            to="/dashboard"
            className=" cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}
