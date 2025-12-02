import { Button } from "@/shared/ui";
import type { User } from "../../../../../../entities/user";
import { GroupCard } from "./card";

interface GroupsProps {
  user: User;
}

export function Groups({ user }: GroupsProps) {
  const { groups } = user;
  const hasGroups = groups.length > 0;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Responsible Groups</h3>
      </div>

      <div className="px-6 py-5">
        {hasGroups ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <GroupCard key={group._id} id={group._id} name={group.name} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">This user is not responsible for any groups yet.</p>
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
