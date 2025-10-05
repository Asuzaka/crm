import type { User } from "../../../entities/user";
import { ClockIcon, LayersIcon, ShieldIcon, UserIcon } from "lucide-react";

export function Overview({ manager }: { manager: User }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Manager Information</h3>
      </div>
      <div className="px-6 py-5">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <UserIcon className="h-4 w-4 mr-2" /> Full Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{manager.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <UserIcon className="h-4 w-4 mr-2" /> Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{manager.email}</dd>
          </div>
          {/* <div> */}
          {/*   <dt className="text-sm font-medium text-gray-500 flex items-center"> */}
          {/*     <UserIcon className="h-4 w-4 mr-2" /> Phone */}
          {/*   </dt> */}
          {/*   <dd className="mt-1 text-sm text-gray-900">{manager.phone}</dd> */}
          {/* </div> */}
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" /> Date Joined
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(manager.createdAt).toLocaleDateString("en-Us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <LayersIcon className="h-4 w-4 mr-2" /> Responsible Groups
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {manager.responsible.map((group, i) => (
                <span key={group._id}>
                  {group.name}
                  {i < manager.responsible.length - 1 ? ", " : ""}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <ShieldIcon className="h-4 w-4 mr-2" /> Role
            </dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{manager.role}</dd>
          </div>
        </dl>
      </div>
      <div className="px-6 py-5 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Total Actions</p>
            <p className="text-2xl font-semibold text-blue-900">{manager.activity}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-800">Last Active</p>
            <p className="text-lg font-semibold text-green-900">{new Date(manager.lastLogin).toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">Groups Managed</p>
            <p className="text-2xl font-semibold text-yellow-900">{manager.responsible.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
