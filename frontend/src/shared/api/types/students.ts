import type { Student } from "../../../entities/student";

export interface getStudentsType {
  status: string;
  data: Student[];
  results: number;
  documents: number;
  pages: number;
}

export interface getStudentType {
  status: string;
  data: Student;
}
