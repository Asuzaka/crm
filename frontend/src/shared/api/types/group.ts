import type { GroupOption } from "../../../entities/group";

export interface GroupOptionResponse {
  status: string;
  data: GroupOption[];
  results: number;
}

export interface GroupsSearchResponse {
  status: string;
  data: GroupOption[];
}
