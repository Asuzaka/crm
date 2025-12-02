import { useQuery } from "@tanstack/react-query";
import { getRecordsOfUser } from "../api/api";

export function useGetUserRecords(id: string) {
  return useQuery({
    queryFn: () => getRecordsOfUser(id),
    queryKey: ["records", id],
  });
}
