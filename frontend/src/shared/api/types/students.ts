import type { Student, StudentList } from "../../../entities/student";
import type {
  GroupForStudentList,
  StudentGet,
} from "../../../entities/student/model/types";

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

export interface StudentSearchResponse {
  stautus: string;
  data: GroupForStudentList[];
}

export interface StudentsForGroup {
  status: string;
  data: Student[];
  results: number;
  pages: number;
}

export interface StudentGetResponse {
  status: string;
  data: StudentGet;
}
