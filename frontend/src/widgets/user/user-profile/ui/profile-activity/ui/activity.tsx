import type { User } from "../../../../../../entities/user";
import { useGetUserRecords } from "../../../../../../entities/record";
import { Error } from "../../../../../../pages/error";
import { Loader } from "../../../../../../shared/components/loader";
import { ActivityTable } from "./table";
import { EmptyState } from "./empty-state";

interface ActivityProps {
  user: User;
}

export function Activity({ user }: ActivityProps) {
  const { data, isPending, error } = useGetUserRecords(user._id);

  if (isPending) return <Loader />;
  if (error) return <Error title="Failed to get activity" message={error.message} />;

  const records = data?.data ?? [];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Activity History</h3>
      </div>

      {records.length > 0 ? <ActivityTable records={records} /> : <EmptyState />}
    </div>
  );
}
