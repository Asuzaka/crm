import type { User } from "../../../entities/user/model/types";

export interface LoginType {
  status: string;
  data: User;
}
