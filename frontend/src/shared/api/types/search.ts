import type { SearchType } from "../../components/multi-field";

export interface searchResponseType {
  status: string;
  data: SearchType[];
}
