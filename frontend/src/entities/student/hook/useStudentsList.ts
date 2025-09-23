import { useQuery } from "@tanstack/react-query";
import { getStudentsList } from "../../../shared/api/endpoints";

export function useStudentsList(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getStudentsList(page, limit, query),
    queryKey: ["students", page, limit, query],
  });
}
