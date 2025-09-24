import type { Group, GroupOption } from "../../../entities/group";

export interface GroupOptionResponse {
  status: string;
  data: Group[];
  results: number;
  documents: number;
  pages: number;
}

export interface getGroupResponse {
  status: string;
  data: Group;
}

export interface GroupsSearchResponse {
  status: string;
  data: GroupOption[];
}
