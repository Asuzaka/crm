import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../../shared/api/endpoints";

export function useExpenseAsList(page: number, limit: number) {
  return useQuery({
    queryFn: () => getExpenses(page, limit),
    queryKey: ["expenses", page, limit],
  });
}
