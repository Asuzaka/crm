import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/api";

export function useGetRecords(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getRecords(page, limit, query),
    queryKey: ["records", page, limit, query],
  });
}
