import { useGetRecord } from "@/entities/record";
import { Error } from "@/pages/error";
import { ROUTES } from "@/shared/consts/routes";
import { Loader } from "@/shared/ui";
import { InfoItem, MetadataViewer } from "@/widgets/history";
import { ArrowLeftIcon, ClockIcon, Paperclip, UserIcon } from "lucide-react";
import { Link, useParams } from "react-router";

export function View() {
  const { id } = useParams();
  const { data, isPending, error } = useGetRecord(id!);

  if (isPending) return <Loader />;
  if (error) return <Error title="Failed to get Log" message={error.message} />;
  if (!data) return null;

  const record = data.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to={ROUTES.history.main} className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Activity Details</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {record.entityType} {record.actionType.toLowerCase()}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Activity #{record._id}</p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{record.description}</dd>
            </div>

            <InfoItem label="Timestamp" icon={ClockIcon}>
              {new Date(record.createdAt).toLocaleString()}
            </InfoItem>

            <InfoItem label="Performed By" icon={UserIcon}>
              {record.user?.name || "N/A"}
            </InfoItem>

            <InfoItem label="Entity" icon={Paperclip}>
              {record.entityId}
            </InfoItem>

            <MetadataViewer metadata={record.metadata} />
          </dl>
        </div>
      </div>
    </div>
  );
}
