import type { LoginType } from "../types/auth";
import type { LoginSchemaType } from "../../../features/auth";
import { client } from "../client";

export function login(credentials: LoginSchemaType) {
  return client<LoginType>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function authenticated() {
  return client<LoginType>("/v1/auth/authenticated", { method: "GET" });
}

export function logout() {
  return client<unknown>("/v1/auth/logout", { method: "GET" });
}
