import { GroupCreateForm } from "@/features/group/add-group";
import { CreatePageCover } from "@/shared/ui";

export function Create() {
  return (
    <CreatePageCover label="Create New Group">
      <GroupCreateForm />
    </CreatePageCover>
  );
}
