import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
  DollarSignIcon,
  FileTextIcon,
  CreditCardIcon,
  ReceiptIcon,
} from "lucide-react";
import { useGetIncome } from "../../../features/edit-income";
import { Error } from "../../error";
import { Loader } from "../../../shared/components";
import { Modal } from "../../../shared/ui";
import { IncomeDelete } from "../../../widgets/income-delete";

export function View() {
  const { id } = useParams();

  const { data, isPending, error } = useGetIncome(id!);

  if (isPending) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error)
    return <Error title="Failed to get income" message={error.message} />;

  return (
    <Modal>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link
              to="/income"
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-800">
              Payment Details
            </h1>
          </div>

          <div className="flex space-x-3">
            <Link
              to={`/incomes/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <Modal.Open opens="delete-payment">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </button>
            </Modal.Open>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Receipt #{data.data.receiptNumber}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Created on {new Date(data.data.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="px-3 py-1 text-lg font-semibold text-green-700">
              ${data.data.amount}
            </span>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Student
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link
                    to={`/students/${data.data.student._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {data.data.student.name}
                  </Link>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DollarSignIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Amount
                </dt>
                <dd className="mt-1 text-sm font-medium text-green-600 sm:mt-0 sm:col-span-2">
                  ${data.data.amount}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CreditCardIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Payment Method
                </dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      data.data.method === "cash"
                        ? "bg-green-100 text-green-800"
                        : data.data.method === "card"
                        ? "bg-blue-100 text-blue-800"
                        : data.data.method === "bank"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {data.data.method}
                  </span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <ReceiptIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Group
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link
                    to={`/groups/${data.data.group._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {data.data.group.name}
                  </Link>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Processed By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.data.createdBy}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FileTextIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Notes
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.data.notes || "No notes provided"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Print Receipt Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ReceiptIcon className="h-4 w-4 mr-2" />
            Print Receipt
          </button>
        </div>
      </div>

      <Modal.Window name="delete-payment">
        <IncomeDelete id={id} name={data.data.receiptNumber} />
      </Modal.Window>
    </Modal>
  );
}
