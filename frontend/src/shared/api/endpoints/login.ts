import type { LoginFormData } from "../../../features/auth";
import { client } from "../client";
import type { LoginResponseDTO } from "../types/auth";

export function login(credentials: LoginFormData) {
  return client<LoginResponseDTO>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
