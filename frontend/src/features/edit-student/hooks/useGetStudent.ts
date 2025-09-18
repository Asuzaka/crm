import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../../shared/api/endpoints";

export function useGetStudent(id: string) {
  return useQuery({ queryFn: () => getStudent(id), queryKey: ["student", id] });
}
