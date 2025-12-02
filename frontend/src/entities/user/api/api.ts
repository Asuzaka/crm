import type { SearchResulType } from "../../../shared/api/types";
import type { getUsersType, getUserType } from "../model/types";
import type { UserCreateSchemaType, UserUpdateSchemaType } from "../../../features/user";
import { client } from "../../../shared/api/client";

export function getUsers(page: number, limit: number, query: string) {
  return client<getUsersType>(`/v1/users?page=${page}&limit=${limit}${query}`, {
    method: "GET",
  });
}

export function getUser(id: string) {
  return client<getUserType>(`/v1/users/${id}`, { method: "GET" });
}

export function createUser(body: UserCreateSchemaType) {
  return client<getUserType>("/v1/users/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateUser(id: string, body: Partial<UserUpdateSchemaType>) {
  return client<getUserType>(`/v1/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function updateMe(body: unknown) {
  return client<getUserType>("/v1/users/", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteUsers(id: string[]) {
  return client<void>("/v1/users/", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export async function searchUsers(query: string) {
  const d = await client<SearchResulType>(`/v1/users/search?query=${query}`, {
    method: "GET",
  });
  return d.data;
}
