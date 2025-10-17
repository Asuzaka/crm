import type { User } from "../../../entities/user";
import { EditIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { Modal } from "../../../shared/ui";
import { ManagerDelete as Delete } from "../../manager-delete";
import { Button } from "../../../shared/components/button";
import { TabButton } from "../../../shared/components/button/ui/tab";

interface HeaderProps {
  manager: User;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  id: string;
}

export function Header({ manager, activeTab, setActiveTab, id }: HeaderProps) {
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
              <h2 className="text-xl font-bold text-gray-900">{manager.name}</h2>
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
              <Button variant="destructive" icon={<TrashIcon className="h-4 w-4 mr-2" />}>
                Delete
              </Button>
            </Modal.Open>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex overflow-x-auto">
            <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
              Overview
            </TabButton>

            <TabButton active={activeTab === "permissions"} onClick={() => setActiveTab("permissions")}>
              Permissions
            </TabButton>

            <TabButton active={activeTab === "groups"} onClick={() => setActiveTab("groups")}>
              Groups
            </TabButton>

            <TabButton active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
              Activity History
            </TabButton>
          </nav>
        </div>
      </div>
      <Modal.Window name="manager-delete">
        <Delete name={manager.name} id={id} />
      </Modal.Window>
    </Modal>
  );
}
