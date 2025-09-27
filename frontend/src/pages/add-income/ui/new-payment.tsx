import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { CreateIncome } from "../../../features/add-income";

export function PaymentNew() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/income" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Payment
        </h1>
      </div>
      <CreateIncome />
    </div>
  );
}
