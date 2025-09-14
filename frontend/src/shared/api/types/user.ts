import type { User } from "../../../entities/user";

export interface CreateUserResponseDTO {
  status: string;
  data: User;
}
