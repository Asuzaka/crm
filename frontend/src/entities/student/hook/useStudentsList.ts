import { useQuery } from "@tanstack/react-query";
import { getStudentsList } from "../../../shared/api/endpoints/getStudents";

export function useStudentsList(page:number, limit:number){

  return useQuery({queryFn: ()=> getStudentsList(page, limit), queryKey: ["students", page, limit]})
}
