import { ROUTES } from "@/shared/consts/routes";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function IncomeHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Income</h1>
      <Link
        to={ROUTES.income.create}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Record Payment
      </Link>
    </div>
  );
}
