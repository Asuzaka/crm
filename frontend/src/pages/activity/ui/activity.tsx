import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useGetRecords } from "../../../entities/record/hooks/use-get-records";
import { useNavigate } from "react-router";
import { Error } from "../../error";
import { getReadyQuery } from "../helper/get-ready-query";
import { useDebounce } from "../../../shared/hooks";
import { returnColorOfAction } from "../helper/return-color";
import { Loader } from "../../../shared/components/loader";
import { Pagination } from "../../../shared/components/pagination";
import { NoResultAndReset } from "../../../shared/components/no-result";
import { Button } from "../../../shared/components/button";

export function Activity() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const { query, setQuery, debouncedQuery } = useDebounce();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useGetRecords(page, 20, getReadyQuery(debouncedQuery));

  if (error) return <Error title="Failed to fetch activity" message={error.message} />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity History</h1>
        <p className="text-gray-600">Track all actions performed by managers across the system.</p>
      </div>

      {/* Search and Basic Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex flex-col md:flex-row gap-4">
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
                placeholder="Search activities..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div className="md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastWeek">Last 7 Days</option>
                <option value="lastMonth">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Toggle Advanced Filters Button */}
          <div>
            <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
              <FilterIcon className="h-4 w-4 mr-2" />
              {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
              {showAdvancedFilters ? (
                <ChevronUpIcon className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Custom Date Range */}
        {/* {true && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
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
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        )} */}

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Manager Filter */}
            <div>
              <label htmlFor="manager-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Manager
              </label>
              <select
                id="manager-filter"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Managers</option>
                {[].map((manager: { id: string; name: string }) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Type Filter */}
            <div>
              <label htmlFor="action-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Action Type
              </label>
              <select
                id="action-filter"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Actions</option>
                {[].map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            {/* Entity Type Filter */}
            <div>
              <label htmlFor="entity-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Entity Type
              </label>
              <select
                id="entity-filter"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Entities</option>
                {[].map((entity) => (
                  <option key={entity} value={entity}></option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Activity Table */}
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
                    onClick={() => console.log("sort by date-time")}
                  >
                    <div className="flex items-center">
                      Date & Time
                      {/* {sortField === 'timestamp' && */}
                      {/*   (sortDirection === 'asc' ? ( */}
                      {/*     <ChevronUpIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ) : ( */}
                      {/*     <ChevronDownIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ))} */}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => console.log("user")}
                  >
                    <div className="flex items-center">
                      Performed By
                      {/* {sortField === 'user' && */}
                      {/*   (sortDirection === 'asc' ? ( */}
                      {/*     <ChevronUpIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ) : ( */}
                      {/*     <ChevronDownIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ))} */}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => console.log("action")}
                  >
                    <div className="flex items-center">
                      Action
                      {/* {sortField === 'action' && */}
                      {/*   (sortDirection === 'asc' ? ( */}
                      {/*     <ChevronUpIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ) : ( */}
                      {/*     <ChevronDownIcon className="h-4 w-4 ml-1" /> */}
                      {/*   ))} */}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Entity Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data.map((activity) => (
                  <tr
                    onClick={() => navigate(`/activity/${activity._id}`)}
                    key={activity._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-800">
                            {activity.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{activity.user.name}</div>
                          <div className="text-xs text-gray-500">{activity.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${returnColorOfAction(
                          activity.actionType
                        )}`}
                      >
                        {activity.entityType + " " + activity.actionType.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      <div className="truncate">{activity.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                        {activity.entityType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.data.length === 0 && (
            <NoResultAndReset
              onClick={() => {
                console.log("reset filter");
              }}
            />
          )}
          <Pagination setPage={setPage} page={page} totalPages={data.pages} totalItems={data.documents} />
        </div>
      )}
    </div>
  );
}
