import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { CreatePageProps } from "..";

export function CreatePageCover({ children, label }: CreatePageProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{label}</h1>
      </div>
      {children}
    </div>
  );
}
