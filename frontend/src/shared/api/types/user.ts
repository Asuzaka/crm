import type { User, GetUser, UsersAsList } from "../../../entities/user";

export interface CreateUserResponseDTO {
  status: string;
  data: User;
}

export interface GetUsersResponse {
  status: string;
  data: UsersAsList[];
  results: number;
}

export interface UserGetResponse {
  status: string;
  data: GetUser;
}
