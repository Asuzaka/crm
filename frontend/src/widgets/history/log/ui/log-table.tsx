import { NoResultAndReset, Pagination } from "@/shared/ui";
import { ActivityTableRow } from "./log-row";
import type { action, getRecordsType } from "@/entities/record";
import { ActivityTableHeader } from "./log-header";

interface ActivityTableProps {
  data?: getRecordsType;
  navigate: (path: string) => void;
  returnColorOfAction: (actionType: action) => string;
  handleResetFilters: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function ActivityTable({
  data,
  navigate,
  returnColorOfAction,
  handleResetFilters,
  page,
  setPage,
}: ActivityTableProps) {
  if (!data) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <ActivityTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {data.data.map((activity) => (
              <ActivityTableRow
                key={activity._id}
                activity={activity}
                navigate={navigate}
                returnColorOfAction={returnColorOfAction}
              />
            ))}
          </tbody>
        </table>
      </div>

      {data.data.length === 0 && <NoResultAndReset name="logs" onClick={handleResetFilters} />}
      {data.data.length > 0 && (
        <Pagination setPage={setPage} page={page} totalPages={data.pages} totalItems={data.documents} />
      )}
    </div>
  );
}
