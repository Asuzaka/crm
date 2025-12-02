import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../api/api";

export function useGetIncome(id: string) {
  return useQuery({ queryFn: () => getPayment(id), queryKey: ["income", id] });
}
