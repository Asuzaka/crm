import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../../../shared/api/endpoints";

export function useGetExpense(id: string) {
  return useQuery({ queryFn: () => getExpense(id), queryKey: ["expense", id] });
}
