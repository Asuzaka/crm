import type { ActivityRecord } from "../../../../../../entities/record";
import { ActivityRow } from "./row";

export function ActivityTable({ records }: { records: ActivityRecord[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Date & Time", "Action", "Details"].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record) => (
            <ActivityRow key={record._id} activity={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
