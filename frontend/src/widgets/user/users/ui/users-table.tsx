import { Link } from "react-router";
import type { getUsersType } from "@/entities/user";
import { ROUTES } from "@/shared/consts/routes";
import { DeleteUser } from "@/features/user";

interface UsersTableProps {
  data: getUsersType;
}

export function UsersTable({ data }: UsersTableProps) {
  return data.data.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["User", "Groups", "Activity", "Actions"].map((col) => (
              <th
                key={col}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.data.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {user.groups.map((group, i) => (
                    <span key={i}>
                      {group.name}
                      {i < user.groups.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  {user.groups.length} group{user.groups.length !== 1 ? "s" : ""}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.activity} actions</div>
                {user.lastLogin && (
                  <div className="text-xs text-gray-500">Last: {new Date(user.lastLogin).toLocaleString()}</div>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <Link to={ROUTES.users.d.view(user._id)} className="text-blue-600 hover:text-blue-900 mr-4">
                  View
                </Link>
                <Link to={ROUTES.users.d.edit(user._id)} className="text-blue-600 hover:text-blue-900 mr-4">
                  Edit
                </Link>
                <DeleteUser name={user.name} id={user._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="py-10 text-center text-gray-500">No users found matching your search.</div>
  );
}
