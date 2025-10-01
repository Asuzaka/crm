import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";
import type { UserUpdateSchemaType } from "..";
import { updateUser } from "../../../shared/api/endpoints/user";

export function useUpdateUser(id: string) {
  return useMutation({
    mutationFn: (data: UserUpdateSchemaType) => updateUser(id, data),
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
