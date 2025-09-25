import type { getGroupResponse } from "../../../shared/api/types/group";
import type { createFormData } from "../../add-group";

export function mapGroupResponse(data: getGroupResponse): createFormData {
  return {
    ...data.data,
    start: new Date(data.data.start),
    teacher: data.data.teacher._id,
    students: data.data.students.map((each) => each._id),
  };
}
