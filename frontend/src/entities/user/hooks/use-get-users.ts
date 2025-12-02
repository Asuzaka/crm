import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/api";

export function useGetUsers(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getUsers(page, limit, query),
    queryKey: ["users", page, limit, query],
  });
}
