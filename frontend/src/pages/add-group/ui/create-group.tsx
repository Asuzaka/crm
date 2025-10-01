import { GroupCreateForm } from "../../../features/add-group";
import { CreatePageCover } from "../../../shared/components/create-page";

export function Create() {
  return (
    <CreatePageCover label="Create New Group">
      <GroupCreateForm />
    </CreatePageCover>
  );
}
