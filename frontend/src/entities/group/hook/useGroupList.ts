import { useQuery } from "@tanstack/react-query";
import { getGroupsAsOption } from "../../../shared/api/endpoints";

export function useGroupList(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getGroupsAsOption(page, limit, query),
    queryKey: ["groups", page, limit, query],
  });
}
