import { CreateIncome } from "../../../features/add-income";
import { CreatePageCover } from "../../../shared/components";

export function Create() {
  return (
    <CreatePageCover label="Create New Payment">
      <CreateIncome />
    </CreatePageCover>
  );
}
