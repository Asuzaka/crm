import type { User } from "../../../entities/user";
import { Link } from "react-router";
import { Button } from "../../../shared/components/button";

export function Groups({ manager }: { manager: User }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Responsible Groups</h3>
      </div>
      <div className="px-6 py-5">
        {manager.responsible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {manager.responsible.map((group) => (
              <div key={group._id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="text-md font-medium text-blue-900">{group.name}</h4>
                <div className="mt-4 flex justify-end">
                  <Link to={`/groups/${group._id}`} className="text-sm text-blue-600 hover:text-blue-800">
                    View Group
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">This manager is not responsible for any groups yet.</p>
        )}
      </div>
      <div className="px-6 py-5 border-t border-gray-200">
        <div className="flex justify-end">
          <Button>Assign Groups</Button>
        </div>
      </div>
    </div>
  );
}
