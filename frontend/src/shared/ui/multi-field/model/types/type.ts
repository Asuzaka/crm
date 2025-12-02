import type { Control, FieldValues, Path } from "react-hook-form";

export interface SearchType {
  _id: string;
  name: string;
}

export interface MultiFieldSelectProps<T extends FieldValues> {
  control: Control<T>; // RHF control
  name: Path<T>; // e.g. "groups" or "students"
  label: string; // UI label
  maxItems?: number; // default 10
  initialValues?: SearchType[];
  fetchOptions: (search: string) => Promise<SearchType[]>; // API fetcher
}
