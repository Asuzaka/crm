import type { Group } from "../../../entities/group";

export interface getGroupsType {
  status: string;
  data: Group[];
  results: number;
  documents: number;
  pages: number;
}

export interface getGroupType {
  status: string;
  data: Group;
}
