import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../../../shared/api/endpoints/group";

export function useGetGroups(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getGroups(page, limit, query),
    queryKey: ["groups", page, limit, query],
  });
}
