import { EditIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import type { GetUser } from "../../../entities/user";
import { Modal } from "../../../shared/ui";
import { useDeleteUser } from "../../../features/delete-manager";
import { ManagerDelete as Delete } from "../../manager-delete";

interface HeaderProps {
  manager: GetUser;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  id: string;
}

export function Header({ manager, activeTab, setActiveTab, id }: HeaderProps) {
  const { mutate } = useDeleteUser([id]);

  return (
    <Modal>
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-medium text-blue-800">
                {manager.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="ml-5">
              <h2 className="text-xl font-bold text-gray-900">
                {manager.name}
              </h2>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="truncate">{manager.email}</span>
              </div>
              {/* <div className="mt-1 flex items-center text-sm text-gray-500"> */}
              {/*   <span className="truncate">{manager.phone}</span> */}
              {/* </div> */}
            </div>
          </div>
          <div className="mt-5 flex sm:mt-0">
            <Link
              to={`/managers/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <Modal.Open opens="manager-delete">
              <button
                onClick={() => console.log("delete -> modal")}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove
              </button>
            </Modal.Open>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("permissions")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "permissions"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Permissions
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "groups"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "activity"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Activity History
            </button>
          </nav>
        </div>
      </div>
      <Modal.Window name="manager-delete">
        <Delete name={manager.name} id={id} />
      </Modal.Window>
    </Modal>
  );
}
