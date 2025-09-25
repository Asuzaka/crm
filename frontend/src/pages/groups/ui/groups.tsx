import { useState } from "react";
import { Link } from "react-router";
import { PlusIcon, SearchIcon, TrashIcon, EditIcon } from "lucide-react";
import { Modal } from "../../../shared/ui";
import { GroupDelete } from "../../../widgets/group-delete";
import { useGroupList } from "../../../entities/group";
import { Error } from "../../error";
import { Loader, Pagination } from "../../../shared/components";
import { getReadyQuery } from "../helper/get-ready-query";
import { useDebounce } from "../../../shared/hooks";

export function Groups() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const { query, setQuery, debouncedQuery } = useDebounce();
  const { data, isPending, error } = useGroupList(
    page,
    12,
    getReadyQuery(debouncedQuery, status)
  );

  if (error)
    return <Error title="Failed to get groups" message={error.message} />;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Groups
        </h1>
        <Link
          to="/groups/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Group
        </Link>
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search groups..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* Status Filter */}
          <div className="relative">
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>
      {/* Groups Grid */}
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((group) => (
              <div
                key={group._id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {group.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        group.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Instructor:</span>{" "}
                      {group.teacher?.name || "No-teacher"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Schedule:</span>{" "}
                      {group.schedule.time || "No-time"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Monthly Fee:</span> $
                      {group.price}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {group.students.length} students
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                  <Link
                    to={`/groups/${group._id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/groups/${group._id}/edit`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    <EditIcon className="h-4 w-4 inline mr-1" />
                    Edit
                  </Link>
                  <Modal>
                    <Modal.Open opens={`delete-${group._id}`}>
                      <button
                        onClick={() => console.log("deleted group")}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-4 w-4 inline mr-1" />
                        Delete
                      </button>
                    </Modal.Open>
                    <Modal.Window name={`delete-${group._id}`}>
                      <GroupDelete name={group.name} id={group._id} />
                    </Modal.Window>
                  </Modal>
                </div>
              </div>
            ))}
          </div>

          {["wk"].length === 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">
                No groups found matching your filters.
              </p>
            </div>
          )}
          <Pagination
            setPage={setPage}
            page={page}
            totalPages={data.pages}
            totalItems={data.documents}
          />
        </>
      )}
    </div>
  );
}
