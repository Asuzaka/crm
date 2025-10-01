import type { User } from "../../../entities/user";

export interface getUserType {
  status: string;
  data: User;
}

export interface getUsersType {
  status: string;
  data: User[];
  results: number;
  documents: number;
  pages: number;
}
