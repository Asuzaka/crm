import { UserCreateForm } from "../../../features/add-manager";
import { CreatePageCover } from "../../../shared/components";

export function Create() {
  return (
    <CreatePageCover label="Create New Manager">
      <UserCreateForm />
    </CreatePageCover>
  );
}
