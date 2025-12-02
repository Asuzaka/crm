import type { getPaymentsType } from "@/entities/income";
import { DeleteIncome } from "@/features/income";
import { returnColorOfMethod } from "@/pages/income/helper/return-color-of-method";
import { ROUTES } from "@/shared/consts/routes";
import { Link } from "react-router";

export function IncomeTable({ data }: { data: getPaymentsType }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Date", "Student", "Group", "Amount", "Method", "Receipt"].map((field) => (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.data.map((income) => (
            <tr key={income._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(income.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-medium text-blue-800">
                      {income.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{income.student.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {income.group?.name || "deleted group"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${income.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${returnColorOfMethod(
                    income.method
                  )}`}
                >
                  {income.method}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.receiptNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={ROUTES.income.d.view(income._id)} className="text-blue-600 hover:text-blue-900 mr-4">
                  View
                </Link>

                <>
                  <Link to={ROUTES.income.d.edit(income._id)} className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </Link>
                  <DeleteIncome name={income.student.name} id={income._id} />
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
