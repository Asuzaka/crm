import { useQuery } from "@tanstack/react-query";
import { searchGroups } from "../../../shared/api/endpoints/group";

export function useGroupSearch(search: string) {
  return useQuery({
    queryFn: async () => {
      const data = await searchGroups(search);
      return data.data;
    },
    queryKey: ["search-group"],
  });
}
