import { CreateIncome } from "../../../features/add-income";
import { CreatePageCover } from "../../../shared/components/create-page";

export function Create() {
  return (
    <CreatePageCover label="Create New Payment">
      <CreateIncome />
    </CreatePageCover>
  );
}
