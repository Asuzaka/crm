import { useState } from "react";
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  DollarSignIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { useGetExpenses, type Expense } from "../../../entities/expense";
import { Error } from "../../error";
import { Modal } from "../../../shared/ui";
import { Link } from "react-router";
import { Delete } from "../../../widgets/expense-delete/ui/delete";
import { useDebounce } from "../../../shared/hooks";
import { getColorOfCategory } from "../helper/get-color";
import { ExpenseCreateForm } from "../../../features/add-expense";
import { getReadyQuery } from "../helper/get-query-ready";
import { Loader } from "../../../shared/components/loader";
import { Pagination } from "../../../shared/components/pagination";
import { Button } from "../../../shared/components/button";

export function Expenses() {
  const { query, setQuery, debouncedQuery } = useDebounce();
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useGetExpenses(page, 20, getReadyQuery(debouncedQuery));
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (error) return <Error title="Failed to get expences" message={error.message} />;

  return (
    <Modal>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Expense Management</h1>
          <Modal.Open opens="new-expense">
            <Button icon={<PlusIcon className="h-4 w-4 mr-2" />}>Add New Expense</Button>
          </Modal.Open>
        </div>
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search expenses..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Date Filter */}
            <div className="md:w-64">
              <select
                onChange={(e) => setDateFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Dates</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            {/* Toggle Filters */}
            <div>
              <Button
                variant="outline"
                icon={<FilterIcon className="h-4 w-4 mr-2" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? (
                  <ChevronUpIcon className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          </div>
          {/* Custom Date Range */}
          {dateFilter === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All Categories</option>
                    {[].map((category: { id: string; name: string }) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Table */}
        {isPending ? (
          <Loader />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Date
                        {sortField === "date" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => console.log("category")}
                    >
                      <div className="flex items-center">
                        <TagIcon className="h-4 w-4 mr-1" />
                        Category
                        {sortField === "category" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        Recipient
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => console.log("amount")}
                    >
                      <div className="flex items-center">
                        <DollarSignIcon className="h-4 w-4 mr-1" />
                        Amount
                        {sortField === "amount" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data.map((expense: Expense) => (
                    <tr key={expense._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(expense.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorOfCategory(
                            expense.category.trim()
                          )}`}
                        >
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.manager?.name || expense.vendorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        -${expense.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.paymentMethod}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{expense.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/expenses/${expense._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                          View
                        </Link>

                        <Link to={`/expenses/${expense._id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                          Edit
                        </Link>
                        <Modal.Open opens={`delete-expense-${expense._id}`}>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </Modal.Open>
                        <Modal.Window name={`delete-expense-${expense._id}`}>
                          <Delete id={expense._id} />
                        </Modal.Window>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.data.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No expenses found.</p>
              </div>
            )}
            <Pagination page={page} setPage={setPage} totalItems={data.documents} totalPages={data.pages} />
          </div>
        )}
      </div>

      <Modal.Window name="new-expense">
        <ExpenseCreateForm />
      </Modal.Window>
    </Modal>
  );
}
