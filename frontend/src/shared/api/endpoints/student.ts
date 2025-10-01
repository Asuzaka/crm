import type { StudentCreateSchemaType } from "../../../features/add-student";
import type { StudentUpdateSchemaType } from "../../../features/edit-student";
import { client } from "../client";
import type { searchResponseType } from "../types/search";
import type { getStudentsType, getStudentType } from "../types/students";

export function getStudents(page: number, limit: number, query: string) {
  return client<getStudentsType>(
    `/v1/students?page=${page}&limit=${limit}${query}`,
    { method: "GET" }
  );
}

export function getStudentsGroup(id: string, page: number, limit: number) {
  return client<getStudentsType>(
    `/v1/students/group/${id}?page=${page}&limit=${limit}`,
    { method: "GET" }
  );
}

export function getStudent(id: string) {
  return client<getStudentType>(`/v1/students/${id}`, { method: "GET" });
}

export function createStudent(studentDetails: StudentCreateSchemaType) {
  return client<getStudentType>("/v1/students", {
    method: "POST",
    body: JSON.stringify(studentDetails),
  });
}

export function updateStudent(body: StudentUpdateSchemaType) {
  return client<getStudentType>(`/v1/students/${body._id}`, {
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

export async function searchStudents(query: string) {
  const d = await client<searchResponseType>(
    `/v1/students/search?query=${query}`,
    {
      method: "GET",
    }
  );
  return d.data;
}
