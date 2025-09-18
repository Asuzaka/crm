import type { StudentGetResponse } from "../../../shared/api/types";
import type { StudentFormData } from "../../add-student";

export function mapStudentToForm(data: StudentGetResponse): StudentFormData {
  return {
    ...data.data,
    birthDate: data.data.birthDate
      ? new Date(data.data.birthDate).toISOString().split("T")[0] // "YYYY-MM-DD"
      : "",
    groups: data.data.groups.map((group) => group._id),
  }
}
