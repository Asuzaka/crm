import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../shared/api/endpoints";
import type { RegisterFormData } from "../../add-manager";

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (data: RegisterFormData) => updateUser(id, data),
  });
}
