import type { Student, StudentList } from "../../../entities/student";

export interface StudentsAsListResponse {
  status: string;
  data: StudentList[];
  results: number;
  pages: number;
}

export interface CreateStudentResponseDTO {
  status: string;
  data: Student;
}
