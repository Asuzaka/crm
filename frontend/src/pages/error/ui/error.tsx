import { AlertTriangleIcon, ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../../shared/components/button";

interface ErrorProps {
  title?: string;
  message?: string;
  errorCode?: string | number;
}

export function Error({
  title = "Something went wrong",
  message = "We encountered an error while processing your request.",
  errorCode = "",
}: ErrorProps) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <AlertTriangleIcon size={48} className="text-red-600" />
          </div>
        </div>
        {errorCode && <div className="text-gray-400 text-xl font-bold mb-2">Error {errorCode}</div>}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="md" onClick={goBack} icon={<ArrowLeftIcon className="mr-2 h-4 w-4" />}>
            Go Back
          </Button>
          <Link
            to="/dashboard"
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
