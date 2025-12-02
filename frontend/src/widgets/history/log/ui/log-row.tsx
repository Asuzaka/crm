import type { action, ActivityRecord } from "@/entities/record";
import { ROUTES } from "@/shared/consts/routes";

interface ActivityTableRowProps {
  activity: ActivityRecord;
  navigate: (path: string) => void;
  returnColorOfAction: (actionType: action) => string;
}

export function ActivityTableRow({ activity, navigate, returnColorOfAction }: ActivityTableRowProps) {
  const userInitials = activity.user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <tr
      onClick={() => navigate(ROUTES.history.d.view(activity._id))}
      key={activity._id}
      className="hover:bg-gray-50 cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(activity.createdAt).toLocaleString()}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-800">{userInitials}</span>
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
  );
}
