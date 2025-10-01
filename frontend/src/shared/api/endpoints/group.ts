import type { GroupUpdateSchemaType } from "../../../features/edit-group";
import type { getGroupsType, getGroupType } from "../types/group";
import type { searchResponseType } from "../types/search";
import { client } from "../client";

export function getGroups(page: number, limit: number, query: string) {
  return client<getGroupsType>(
    `/v1/groups?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getGroup(id: string) {
  return client<getGroupType>(`/v1/groups/${id}`, { method: "GET" });
}

export function createGroup(body: unknown) {
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
  const d = await client<searchResponseType>(
    `/v1/groups/search?query=${query}`,
    {
      method: "GET",
    }
  );
  return d.data;
}
