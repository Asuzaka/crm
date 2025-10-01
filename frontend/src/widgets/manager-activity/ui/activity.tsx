import type { User } from "../../../entities/user";
import { useGetUserRecords } from "../../../entities/record";
import { returnColorOfAction } from "../../../pages/activity/helper/return-color";
import { Error } from "../../../pages/error";
import { Loader } from "../../../shared/components/loader";

export function Activity({ manager }: { manager: User }) {
  const { data, isPending, error } = useGetUserRecords(manager._id);

  if (isPending) return <Loader />;

  if (error)
    return <Error title="Failed to get acitvity" message={error.message} />;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Activity History</h3>
      </div>
      {data.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.data.map((activity) => (
                <tr key={activity._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(activity.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${returnColorOfAction(
                        activity.actionType
                      )}`}
                    >
                      {activity.entityType +
                        " " +
                        activity.actionType.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">
            No activity history available for this manager.
          </p>
        </div>
      )}
    </div>
  );
}
