import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../../shared/api/endpoints";

export function useGetIncomes(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getPayments(page, limit, query),
    queryKey: ["income", page, limit, query],
  });
}
