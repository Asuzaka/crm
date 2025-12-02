import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/api";

export function useGetExpenses(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getExpenses(page, limit, query),
    queryKey: ["expenses", page, limit, query],
  });
}
