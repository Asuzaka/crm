import type { CreateStudent } from "../../../entities/student";
import { client } from "../client";
import type { CreateStudentResponseDTO } from "../types/students";

export function createStudent(studentDetails: CreateStudent) {
  return client<CreateStudentResponseDTO>("/v1/students", {
    method: "POST",
    body: JSON.stringify(studentDetails),
  });
}
