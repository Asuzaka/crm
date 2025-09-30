import type { getGroupResponse } from "../../../shared/api/types/group";
import type { GroupCreateSchemaType } from "../../add-group";

export function mapGroup(data: getGroupResponse): GroupCreateSchemaType {
  return {
    ...data.data,
    start: new Date(data.data.start),
    teacher: data.data.teacher._id,
    students: data.data.students.map((each) => each._id),
  };
}
