import type { getGroupsType, getGroupType } from "../model/types";
import type { SearchResulType } from "../../../shared/api/types";
import { client } from "../../../shared/api/client";
import type { GroupCreateSchemaType } from "@/features/group/add-group";
import type { GroupUpdateSchemaType } from "@/features/group/edit-group";

export function getGroups(page: number, limit: number, query: string) {
  return client<getGroupsType>(`/v1/groups?page=${page}&limit=${limit}${query}`, {
    method: "GET",
  });
}

export function getGroup(id: string) {
  return client<getGroupType>(`/v1/groups/${id}`, { method: "GET" });
}

export function createGroup(body: GroupCreateSchemaType) {
  return client<getGroupType>("/v1/groups", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateGroup(id: string, body: GroupUpdateSchemaType) {
  return client<getGroupType>(`/v1/groups/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteGroup(id: string[]) {
  return client("/v1/groups", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export async function searchGroups(query: string) {
  const d = await client<SearchResulType>(`/v1/groups/search?query=${query}`, {
    method: "GET",
  });
  return d.data;
}
