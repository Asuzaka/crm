import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  ClockIcon,
  Loader,
  Paperclip,
  UserIcon,
} from "lucide-react";
import { useGetRecord } from "../../../features/view-activity";
import { Error } from "../../error";

export function View() {
  const { id } = useParams();
  const { data, isPending, error } = useGetRecord(id!);

  if (isPending) return <Loader />;

  if (error)
    return <Error title="Failed to get Acitivty" message={error.message} />;

  if (!data) return;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/activity" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Activity Details
        </h1>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {data.data.entityType} {data.data.actionType.toLowerCase()}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Activity #{data.data._id}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.description}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                Timestamp
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(data.data.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                Performed By
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.user.name}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Paperclip className="h-5 w-5 mr-2 text-gray-400" />
                Entity
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.data.entityId}
              </dd>
            </div>
            {/* @later Need to find better approach */}
            {data.data.metadata &&
              Object.entries(data.data.metadata).map(([key, value]) => (
                <div key={key} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
