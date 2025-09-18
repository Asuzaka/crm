import type { StudentFormData } from "../../../features/add-student";
import { client } from "../client";
import type { searchResult } from "../types/search";
import type {
  CreateStudentResponseDTO,
  StudentGetResponse,
  StudentsAsListResponse,
  StudentsForGroup,
} from "../types/students";

export function getStudentsList(page: number, limit: number) {
  return client<StudentsAsListResponse>(
    `/v1/students?page=${page}&limit=${limit}`,
    { method: "GET" }
  );
}

export function createStudent(studentDetails: StudentFormData) {
  return client<CreateStudentResponseDTO>("/v1/students", {
    method: "POST",
    body: JSON.stringify(studentDetails),
  });
}

export async function searchStudents(query: string) {
  const d = await client<searchResult>(`/v1/students/search?query=${query}`, {
    method: "GET",
  });
  return d.data;
}

export function getStudent(id: string) {
  return client<StudentGetResponse>(`/v1/students/${id}`, { method: "GET" });
}

export function getStudentsGroup(id: string, page: number, limit: number) {
  return client<StudentsForGroup>(
    `/v1/students/group/${id}?page=${page}&limit=${limit}`,
    { method: "GET" }
  );
}

export function updateStudent(body: StudentFormData) {
  return client<CreateStudentResponseDTO>(`/v1/students/${body._id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteStudent(id: string[]) {
  return client("/v1/students", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
