import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../shared/api/endpoints";
import type { RegisterPatchFormData } from "../model/manager.schema";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (data: RegisterPatchFormData) => updateUser(id, data),
    mutationKey: ["user", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Manager edited successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to edit manager");
    },
  });
}
