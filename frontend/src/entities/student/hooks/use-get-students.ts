import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../../shared/api/endpoints/student";

export function useGetStudents(page: number, limit: number, query: string) {
  return useQuery({
    queryFn: () => getStudents(page, limit, query),
    queryKey: ["students", page, limit, query],
  });
}
