import type { UserUpdateSchemaType } from "../../../features/user";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../shared/api/queryClient";
import { updateUser } from "../api/api";
import toast from "react-hot-toast";

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (data: Partial<UserUpdateSchemaType>) => updateUser(id, data),
    mutationKey: ["user", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Manager edited");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to edit manager");
    },
  });
}
