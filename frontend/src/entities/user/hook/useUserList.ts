import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../shared/api/endpoints";

export function useUserList(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getUsers(page, limit, query),
    queryKey: ["users", page, limit, query],
  });
}
