import { UserCreateForm } from "../../../features/add-manager";
import { CreatePageCover } from "../../../shared/components/create-page";

export function Create() {
  return (
    <CreatePageCover label="Create New Manager">
      <UserCreateForm />
    </CreatePageCover>
  );
}
