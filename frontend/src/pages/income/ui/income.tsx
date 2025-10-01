import { useState } from "react";
import { Link } from "react-router";
import { PlusIcon, SearchIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { useDebounce } from "../../../shared/hooks";
import { useGetIncomes } from "../../../entities/income";
import { Error } from "../../error";
import { returnColorOfMethod } from "../helper/return-color-of-method";
import { Modal } from "../../../shared/ui";
import { IncomeDelete } from "../../../widgets/income-delete";
import { getReadyQuery } from "..";
import { Loader } from "../../../shared/components/loader";
import { Pagination } from "../../../shared/components/pagination";

export function Income() {
  const [page, setPage] = useState(1);
  const { query, setQuery, debouncedQuery } = useDebounce();
  const { data, isPending, error } = useGetIncomes(
    page,
    20,
    getReadyQuery(debouncedQuery)
  );
  const [dateFilter, setDateFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");

  if (error)
    return <Error title="Failed to get payments" message={error.message} />;

  return (
    <Modal>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
            Income
          </h1>
          <Link
            to="/incomes/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Record Payment
          </Link>
        </div>
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search by receipt..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Date Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {[].map((date) => (
                  <option key={date} value={date}>
                    {date === "All" ? "All Dates" : date}
                  </option>
                ))}
              </select>
            </div>
            {/* Group Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {[].map((group) => (
                  <option key={group} value={group}>
                    {group === "All" ? "All Groups" : group}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Income Table */}
        {isPending ? (
          <Loader />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Group
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Receipt
                    </th>
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
                            <div className="text-sm font-medium text-gray-900">
                              {income.student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {income.group?.name || "deleted group"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${income.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${returnColorOfMethod(
                            income.method
                          )}`}
                        >
                          {income.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {income.receiptNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/incomes/${income._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>

                        <>
                          <Link
                            to={`/incomes/${income._id}/edit`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </Link>
                          <Modal.Open opens={`delete-${income._id}`}>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </Modal.Open>
                          <Modal.Window name={`delete-${income._id}`}>
                            <IncomeDelete
                              name={income.student.name}
                              id={income._id}
                            />
                          </Modal.Window>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.data.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No payment records found matching your filters.
                </p>
              </div>
            )}
            <Pagination
              page={page}
              setPage={setPage}
              totalItems={data.documents}
              totalPages={data.pages}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
