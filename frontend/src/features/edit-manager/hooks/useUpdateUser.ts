import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../shared/api/endpoints";
import type { RegisterPatchFormData } from "../model/manager.schema";
import { queryClient } from "../../../shared/api/queryClient";

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (data: RegisterPatchFormData) => updateUser(id, data),
    mutationKey: ["user", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
