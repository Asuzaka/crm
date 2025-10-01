import type { getUserType } from "../../../shared/api/types/user";
import type { UserCreateSchemaType } from "../../add-manager";

export function mapUser(data: getUserType): UserCreateSchemaType {
  return {
    ...data.data,
    responsible: data.data.responsible.map((each) => each._id),
    password: "xxx-empty for now",
  };
}
