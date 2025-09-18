import type { User, GetUser } from "../../../entities/user";

export interface CreateUserResponseDTO {
  status: string;
  data: User;
}

export interface GetUsersResponse {
  status: string;
  data: User[];
  results: number;
}

export interface UserGetResponse {
  status: string;
  data: GetUser;
}
