import { BookOpenIcon } from "lucide-react";
import { Link } from "react-router";

export function GroupList({ groups }: { groups: { _id: string; name: string }[] }) {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        <BookOpenIcon className="h-5 w-5 mr-2 text-gray-400" />
        Groups
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {groups.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {groups.map((group) => (
              <li key={group._id} className="py-2 flex items-center justify-between">
                <span>{group.name}</span>
                <Link to={`/groups/${group._id}`} className="font-medium text-blue-600 hover:text-blue-500">
                  View
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          "No groups assigned"
        )}
      </dd>
    </div>
  );
}
