import { client } from "../client";
import type { GroupOptionResponse } from "../types/group";

export function getGroupsAsOption(){
  return client<GroupOptionResponse>("/v1/groups?fields=_id,name", {method: "GET"})
}
