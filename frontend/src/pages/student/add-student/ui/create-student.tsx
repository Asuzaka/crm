import { StudentCreateForm } from "@/features/student";
import { CreatePageCover } from "@/shared/ui";

export function Create() {
  return (
    <CreatePageCover label="Add New Student">
      <StudentCreateForm />
    </CreatePageCover>
  );
}
