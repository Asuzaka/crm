import type { UserCreateSchemaType } from "../../../features/add-manager";
import type { UserUpdateSchemaType } from "../../../features/edit-manager";
import type { searchResponseType } from "../types/search";
import type { getUsersType, getUserType } from "../types/user";
import { client } from "../client";

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

export function updateUser(id: string, body: UserUpdateSchemaType) {
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
  return client("/v1/users/", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export async function searchUsers(query: string) {
  const d = await client<searchResponseType>(
    `/v1/users/search?query=${query}`,
    {
      method: "GET",
    }
  );
  return d.data;
}
