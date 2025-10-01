import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../../../shared/api/endpoints/group";

export function useGetGroup(id: string) {
  return useQuery({ queryFn: () => getGroup(id), queryKey: ["group", id] });
}
