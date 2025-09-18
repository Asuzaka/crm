import { useQuery } from "@tanstack/react-query";
import { getGroupsAsOption } from "../../../shared/api/endpoints";

export function useGroupOptions (){
  return useQuery({ queryFn: getGroupsAsOption, queryKey : ["groups"]});
}
