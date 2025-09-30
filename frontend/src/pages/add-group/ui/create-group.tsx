import { GroupCreateForm } from "../../../features/add-group";
import { CreatePageCover } from "../../../shared/components";

export function Create() {
  return (
    <CreatePageCover label="Create New Group">
      <GroupCreateForm />
    </CreatePageCover>
  );
}
