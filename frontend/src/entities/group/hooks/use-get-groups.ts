import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/api";

export function useGetGroups(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getGroups(page, limit, query),
    queryKey: ["groups", page, limit, query],
  });
}
