import { useQuery } from "@tanstack/react-query";
import { searchStudents } from "../../../shared/api/endpoints/student";

export function useStudentSearch(search: string) {
  return useQuery({
    queryFn: async () => {
      const data = await searchStudents(search);
      return data;
    },
    queryKey: ["search-student", search],
  });
}
