import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../../../shared/api/endpoints";

export function useGetIncome(id: string) {
  return useQuery({ queryFn: () => getPayment(id), queryKey: ["income", id] });
}
