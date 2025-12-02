import { spinnerSizes, type LoaderProps } from "..";

export function Loader({ message = "Loading...", size = "medium" }: LoaderProps) {
  return (
    <div className="flex justify-center items-center min-h-[400px] w-full">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${spinnerSizes[size]} border-b-2 border-blue-500 mx-auto`}></div>
        {message && <p className="mt-4 text-gray-500">{message}</p>}
      </div>
    </div>
  );
}
