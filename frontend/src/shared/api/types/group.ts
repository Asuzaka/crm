import type { GroupOption } from "../../../entities/group";

export interface GroupOptionResponse {
  status: string;
  data: GroupOption[];
  results: number;
}
