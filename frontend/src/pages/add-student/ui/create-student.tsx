import { StudentCreateForm } from "../../../features/add-student";
import { CreatePageCover } from "../../../shared/components";

export function Create() {
  return (
    <CreatePageCover label=" Create New Student">
      <StudentCreateForm />
    </CreatePageCover>
  );
}
