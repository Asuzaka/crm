import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../../../shared/api/endpoints";

export function useGetRecords(page:number, limit:number){

  return useQuery({queryFn: ()=> getRecords(page, limit), queryKey: ["records", page, limit]})
}
