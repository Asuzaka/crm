import type { User } from "../../../../../../entities/user";
import type { TabKey } from "../../../../../../pages/user";
import { TabButton } from "../../../../../../shared/components/button/ui/tab";
import { DeleteUser } from "../../../../../../features/user";
import { Link } from "react-router";
import { EditIcon } from "lucide-react";
import { ROUTES } from "../../../../../../shared/consts/routes";
import clsx from "clsx";

interface HeaderProps {
  user: User;
  setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>;
  activeTab: string;
  id: string;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "permissions", label: "Permissions" },
  { key: "groups", label: "Groups" },
  { key: "activity", label: "Activity History" },
];

export function Header({ user, activeTab, setActiveTab, id }: HeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      {/* Header Section */}
      <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-medium text-blue-800">{initials}</span>
          </div>

          <div className="ml-5">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex sm:mt-0">
          <Link
            to={ROUTES.users.d.edit(id)}
            className={clsx(
              "inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium",
              "border border-gray-300 bg-white text-gray-700",
              "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            )}
          >
            <EditIcon className="h-4 w-4 mr-2" />
            Edit
          </Link>

          <DeleteUser name={user.name} id={id} />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <nav className="flex overflow-x-auto">
          {TABS.map(({ key, label }) => (
            <TabButton key={key} active={activeTab === key} onClick={() => setActiveTab(key)}>
              {label}
            </TabButton>
          ))}
        </nav>
      </div>
    </div>
  );
}
