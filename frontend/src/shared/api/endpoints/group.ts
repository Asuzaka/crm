import { client } from "../client";
import type { GroupOptionResponse } from "../types/group";
import type { searchResult } from "../types/search";

export function getGroupsAsOption() {
  return client<GroupOptionResponse>("/v1/groups?fields=_id,name", {
    method: "GET",
  });
}

export function getGroup(id: string) {
  return client<unknown>(`/v1/groups/${id}`, { method: "GET" });
}

export function createGroup(body: unknown) {
  return client<unknown>("/v1/groups", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateGroup(id: string, body: unknown) {
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
