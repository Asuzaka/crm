import type { GroupUpdateSchema } from "../../../features/edit-group";
import { client } from "../client";
import type { getGroupResponse, GroupOptionResponse } from "../types/group";
import type { searchResult } from "../types/search";

export function getGroupsAsOption(page: number, limit: number, query: string) {
  return client<GroupOptionResponse>(
    `/v1/groups?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getGroup(id: string) {
  return client<getGroupResponse>(`/v1/groups/${id}`, { method: "GET" });
}

export function createGroup(body: unknown) {
  return client<unknown>("/v1/groups", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateGroup(id: string, body: GroupUpdateSchema) {
  return client<unknown>(`/v1/groups/${id}`, {
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
  const d = await client<searchResult>(`/v1/groups/search?query=${query}`, {
    method: "GET",
  });
  return d.data;
}
