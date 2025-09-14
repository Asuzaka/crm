import type { User } from "../../../entities/user/model/types";

export interface LoginResponseDTO {
  status: string;
  data: User;
}
