import { useQuery } from "@tanstack/react-query";
import { getLessons } from "../../../shared/api/endpoints";

export function useGetLessons(id: string) {
  return useQuery({ queryFn: () => getLessons(id), queryKey: ["lessons", id] });
}
