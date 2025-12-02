import type { UserUpdateSchemaType } from "..";
import type { getUserType } from "../../../../entities/user";

export function mapUser(data: getUserType): UserUpdateSchemaType {
  return {
    ...data.data,
    groups: data.data.groups.map((each) => each._id),
  };
}
