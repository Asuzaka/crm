import { useMutation } from "@tanstack/react-query";
import type { GroupUpdateSchemaType } from "..";
import toast from "react-hot-toast";
import { updateGroup } from "@/entities/group";
import { queryClient } from "@/shared/api/queryClient";

export function useGroupUpdate(id: string) {
  return useMutation({
    mutationFn: (data: GroupUpdateSchemaType) => updateGroup(id, data),
    mutationKey: ["group", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update group");
    },
  });
}
