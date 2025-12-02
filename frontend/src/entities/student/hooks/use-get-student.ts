import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../api/api";

export function useGetStudent(id: string) {
  return useQuery({ queryFn: () => getStudent(id), queryKey: ["student", id] });
}
