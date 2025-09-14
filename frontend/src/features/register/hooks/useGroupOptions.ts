import { useQuery } from "@tanstack/react-query";
import { getGroupsAsOption } from "../../../shared/api/endpoints/getGroups";

export function useGroupOptions (){
  return useQuery({ queryFn: getGroupsAsOption, queryKey : ["groups"]});
}
