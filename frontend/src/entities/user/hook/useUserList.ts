import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../shared/api/endpoints";

export function useUserList(page: number, limit: number){
  
  return useQuery({ queryFn: ()=> getUsers(page, limit) , queryKey: ["users"]})
}
