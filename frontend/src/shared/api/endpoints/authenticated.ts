import { client } from "../client";
import type { LoginResponseDTO } from "../types/auth";

export function authenticated(){
  return client<LoginResponseDTO>("/v1/auth/authenticated", { method: "GET"});
}
