import type { UserGetResponse } from "../../../shared/api/types";
import type { UserCreateSchemaType } from "../../add-manager";

export function mapUser(data: UserGetResponse): UserCreateSchemaType {
  return {
    ...data.data,
    responsible: data.data.responsible.map((each) => each._id),
    password: "xxx-empty for now",
  };
}
