import type { RegisterFormData } from "../../../features/add-manager";
import type { RegisterPatchFormData } from "../../../features/edit-manager";
import { client } from "../client";
import {
  type GetUsersResponse,
  type CreateUserResponseDTO,
  type UserGetResponse,
} from "../types/user";

export function createUser(body: RegisterFormData) {
  return client<CreateUserResponseDTO>("/v1/users/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getUser(id: string) {
  return client<UserGetResponse>(`/v1/users/${id}`, { method: "GET" });
}

export function updateUser(id: string, body: RegisterPatchFormData) {
  return client<CreateUserResponseDTO>(`/v1/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function updateMe(body: unknown) {
  return client<CreateUserResponseDTO>("/v1/users/", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteUsers(id: string[]) {
  return client("/v1/users/", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export function getUsers(page: number, limit: number) {
  return client<GetUsersResponse>(`/v1/users?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}
