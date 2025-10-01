import { useQuery } from "@tanstack/react-query";
import { getLessons } from "../../../shared/api/endpoints/lesson";

export function useGetLessons(id: string, date: string) {
  return useQuery({
    queryFn: () => getLessons(id, date),
    queryKey: ["lessons", id],
  });
}
