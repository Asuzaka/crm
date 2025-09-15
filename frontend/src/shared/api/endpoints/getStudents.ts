import { client } from "../client";
import type { StudentsAsListResponse } from "../types/students";

export function getStudentsList(page:number, limit:number){
  return client<StudentsAsListResponse>(`/v1/students?page=${page}&limit=${limit}`, {method: "GET"})
}
