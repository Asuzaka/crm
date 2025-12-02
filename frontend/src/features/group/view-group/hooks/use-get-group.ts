import { getGroup } from "@/entities/group";
import { useQuery } from "@tanstack/react-query";

export function useGetGroup(id: string) {
  return useQuery({ queryFn: () => getGroup(id), queryKey: ["group", id] });
}
