import { Link } from "react-router";
import { useGetUsers } from "../../../entities/user";
import { Error } from "../../error";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Modal } from "../../../shared/ui";
import { ManagerDelete as Delete } from "../../../widgets/manager-delete";
import { useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { getReadyQuery } from "../helper/get-query-ready";
import { Loader } from "../../../shared/components/loader";
import { Pagination } from "../../../shared/components/pagination";

export function Managers() {
  const [page, setPage] = useState(1);
  const { query, setQuery, debouncedQuery } = useDebounce();
  const { data, isPending, error } = useGetUsers(
    page,
    20,
    getReadyQuery(debouncedQuery)
  );

  if (error)
    return <Error title="Failed to fetch users" message={error.message} />;

  return (
    <Modal>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
            Managers
          </h1>
          <Link
            to="/register"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Manager
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Managers Table */}
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Manager
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Permissions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Groups
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Activity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data.map((manager) => (
                    <tr key={manager._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-medium text-blue-800">
                              {manager.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {manager.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {manager.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {manager.permissions.addStudents && (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Add Students
                            </span>
                          )}
                          {manager.permissions.addStudents && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Edit Students
                            </span>
                          )}
                          {manager.permissions.deleteStudents && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Delete Students
                            </span>
                          )}
                          {manager.permissions.addPayments && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Process Payments
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {manager.responsible.map((group, i) => (
                            <span key={i} className="inline-block">
                              {group.name}
                              {i < manager.responsible.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          {manager.responsible.length} group
                          {manager.responsible.length !== 1 ? "s" : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {manager.activity} actions
                        </div>
                        <div className="text-xs text-gray-500">
                          Last: {new Date(manager.lastLogin).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/managers/${manager._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>
                        <Link
                          to={`/managers/${manager._id}/edit`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </Link>
                        <Modal.Open opens={`delete-manager-${manager._id}`}>
                          <button className="text-red-600 hover:text-red-900">
                            Remove
                          </button>
                        </Modal.Open>
                        <Modal.Window name={`delete-manager-${manager._id}`}>
                          <Delete name={manager.name} id={manager._id} />
                        </Modal.Window>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.data.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">
                  No managers found matching your search.
                </p>
              </div>
            )}
            <Pagination
              setPage={setPage}
              page={page}
              totalPages={data.pages}
              totalItems={data.documents}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
