import { useQuery } from "@tanstack/react-query";
import { getLessons } from "../api/api";

export function useGetLessons(id: string, date: string) {
  return useQuery({
    queryFn: () => getLessons(id, date),
    queryKey: ["lessons", id],
  });
}
