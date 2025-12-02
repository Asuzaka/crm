import { getExpense } from "@/entities/expense";
import { useQuery } from "@tanstack/react-query";

export function useGetExpense(id: string) {
  return useQuery({ queryFn: () => getExpense(id), queryKey: ["expense", id] });
}
