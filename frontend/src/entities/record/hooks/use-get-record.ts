import { useQuery } from "@tanstack/react-query";
import { getRecord } from "../api/api";

export function useGetRecord(id: string) {
  return useQuery({ queryFn: () => getRecord(id), queryKey: ["record", id] });
}
