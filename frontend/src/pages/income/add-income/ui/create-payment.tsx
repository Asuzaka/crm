import { AddIncome } from "@/features/income/add-income";
import { CreatePageCover } from "@/shared/ui";

export function Create() {
  return (
    <CreatePageCover label="Create New Payment">
      <AddIncome />
    </CreatePageCover>
  );
}
