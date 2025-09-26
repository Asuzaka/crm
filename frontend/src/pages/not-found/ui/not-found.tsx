import { ArrowLeftIcon, HomeIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router";

export function NotFound({ full = false }: { full?: boolean }) {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      className={`bg-gray-50 flex flex-col items-center justify-center p-6 text-center ${
        full ? "h-screen w-screen" : "h-full"
      }`}
    >
      <div
        className={
          full
            ? "max-w-xl w-full"
            : "bg-white rounded-lg shadow-md p-8 max-w-lg w-full text-center"
        }
      >
        <div className="flex justify-center mb-6">
          <div
            className={`bg-blue-100 rounded-full ${
              full ? "p-6" : "p-4"
            } flex items-center justify-center`}
          >
            <SearchIcon size={full ? 64 : 48} className="text-blue-600" />
          </div>
        </div>

        <div
          className={`font-bold text-blue-600 mb-4 ${
            full ? "text-7xl" : "text-5xl"
          }`}
        >
          404
        </div>

        <h1
          className={`font-bold text-gray-800 mb-2 ${
            full ? "text-3xl" : "text-2xl"
          }`}
        >
          Page Not Found
        </h1>

        <p
          className={`text-gray-600 mb-8 ${
            full ? "max-w-md mx-auto text-lg" : ""
          }`}
        >
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={goBack}
            className={`cursor-pointer inline-flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${full ? "px-5 py-3 text-base" : "px-4 py-2 text-sm"}`}
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Go Back
          </button>
          <Link
            to="/dashboard"
            className={`cursor-pointer inline-flex items-center justify-center border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${full ? "px-5 py-3 text-base" : "px-4 py-2 text-sm"}`}
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Link>
        </div>

        <div
          className={`text-gray-500 ${
            full
              ? "mt-10 text-sm"
              : "mt-8 pt-6 border-t border-gray-200 text-sm"
          }`}
        >
          If you believe this is an error, please contact support.
        </div>
      </div>
    </div>
  );
}
