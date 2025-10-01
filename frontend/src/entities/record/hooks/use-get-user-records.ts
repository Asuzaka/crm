import { useQuery } from "@tanstack/react-query";
import { getRecordsOfUser } from "../../../shared/api/endpoints/record";

export function useGetUserRecords(id: string) {
  return useQuery({
    queryFn: () => getRecordsOfUser(id),
    queryKey: ["records", id],
  });
}
