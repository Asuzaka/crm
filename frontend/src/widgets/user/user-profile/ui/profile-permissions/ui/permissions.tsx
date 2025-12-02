import type { Permissions, User } from "../../../../../../entities/user";
import { PERMISSIONS, PERMISSIONS_LABELS } from "../../../../../../entities/user/model/constants";
import { PermissionCard } from "./permission-card";

export function Permissions({ user }: { user: User }) {
  const permissions = user.permissions;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
      </div>

      <div className="px-6 py-5 space-y-6">
        {Object.entries(PERMISSIONS_LABELS).map(([sectionKey, sectionLabel]) => {
          const section = permissions[sectionKey as keyof Permissions];
          if (!section) return null;

          return (
            <div key={sectionKey}>
              <h4 className="text-sm font-medium text-gray-900 mb-3">{sectionLabel}</h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(PERMISSIONS).map(([permKey, permLabel]) => (
                  <PermissionCard key={permKey} label={permLabel} active={section[permKey as keyof typeof section]} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
