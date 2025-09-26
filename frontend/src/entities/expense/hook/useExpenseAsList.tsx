import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../../shared/api/endpoints";

export function useExpenseAsList(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getExpenses(page, limit, query),
    queryKey: ["expenses", page, limit, query],
  });
}
