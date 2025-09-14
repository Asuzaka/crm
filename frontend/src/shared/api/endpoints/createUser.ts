import type { RegisterFormData } from "../../../features/register";
import { client } from "../client";
import { type CreateUserResponseDTO } from "../types/user";

export function createUser(body: RegisterFormData) {
  return client<CreateUserResponseDTO>("/v1/users/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
