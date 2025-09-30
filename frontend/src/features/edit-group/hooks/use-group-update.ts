import { useMutation } from "@tanstack/react-query";
import { updateGroup } from "../../../shared/api/endpoints";
import type { GroupUpdateSchemaType } from "..";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

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
