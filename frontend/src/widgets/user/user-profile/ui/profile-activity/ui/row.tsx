import type { ActivityRecord } from "@/entities/record";
import { returnColorOfAction } from "@/pages/history";
import clsx from "clsx";

export function ActivityRow({ activity }: { activity: ActivityRecord }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(activity.createdAt).toLocaleString()}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={clsx(
            "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
            returnColorOfAction(activity.actionType)
          )}
        >
          {`${activity.entityType} ${activity.actionType.toLowerCase()}`}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.description}</td>
    </tr>
  );
}
