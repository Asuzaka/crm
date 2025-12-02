import type { Control, FieldValues, Path } from "react-hook-form";
import type { SearchType } from "../../../multi-field";

export interface SelectSingleSearchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  initialValue?: SearchType | null;
  fetchOptions: (search: string) => Promise<SearchType[]>;
  disabled?: boolean;
}
