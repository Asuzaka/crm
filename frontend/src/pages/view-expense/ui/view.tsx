import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  UserIcon,
  TagIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";
import { useGetExpense } from "../../../features/view-expense";
import { Error } from "../../error";
import { Loader } from "../../../shared/components";
import { getColorOfCategory } from "../../expenses/helper/get-color";

export function View() {
  const { id } = useParams();
  const { data, isPending, error } = useGetExpense(id!);

  if (isPending) return <Loader />;

  if (error)
    return <Error title="Failed to get group" message={error.message} />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/expenses" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Expense Details
        </h1>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {data.data.description}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Expense #{data.data._id} | Created on{" "}
            {new Date(data.data.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <DollarSignIcon className="h-5 w-5 mr-2 text-gray-400" />
                Amount
              </dt>
              <dd className="mt-1 text-lg font-semibold text-red-600">
                {data.data.amount} UZS
              </dd>
            </div>
            {/* <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(data.data.createdAt).toLocaleDateString()}
              </dd>
            </div> */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-gray-400" />
                Category
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorOfCategory(
                    data.data.category
                  )}`}
                >
                  {data.data.category}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                Recipient
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.recipientType === "Manager/Staff" &&
                  data.data.manager?.name}
                {data.data.recipientType === "External Vendor" &&
                  data.data.vendorName}
                {data.data.manager && (
                  <span className="text-xs text-gray-500 ml-2">(Staff)</span>
                )}
                {!data.data.manager && (
                  <span className="text-xs text-gray-500 ml-2">(External)</span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CreditCardIcon className="h-5 w-5 mr-2 text-gray-400" />
                Payment Method
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.paymentMethod}
              </dd>
            </div>
            {/* <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                Created By
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.createdBy.name}
              </dd>
            </div> */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2 text-gray-400" />
                Notes
              </dt>
              <dd className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                {data.data.notes || "No additional notes"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
          <Link
            to={`/expenses/${data.data._id}/edit`}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Expense
          </Link>
        </div>
      </div>
    </div>
  );
}
