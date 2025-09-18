import type { UserGetResponse } from "../../../shared/api/types";
import type { RegisterFormData } from "../../add-manager";

export function mapUserResponse(data: UserGetResponse): RegisterFormData {
  return {
    ...data.data,
    responsible: data.data.responsible.map((each) => each._id),
    password: "xxx-empty for now",
  };
}
