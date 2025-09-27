import { Link } from "react-router";
import { RegisterForm } from "../../../features/add-manager";
import { ArrowLeftIcon } from "lucide-react";

export function Register() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/managers" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Manager
        </h1>
      </div>
      <RegisterForm />
    </div>
  );
}
