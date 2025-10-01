import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../../../shared/api/endpoints/record";

export function useGetRecords(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getRecords(page, limit, query),
    queryKey: ["records", page, limit, query],
  });
}
