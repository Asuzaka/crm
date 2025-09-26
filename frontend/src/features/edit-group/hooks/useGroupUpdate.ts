import { useMutation } from "@tanstack/react-query";
import { updateGroup } from "../../../shared/api/endpoints";
import type { GroupUpdateSchema } from "../model/schema";
import { queryClient } from "../../../shared/api/queryClient";

export function useGroupUpdate(id: string) {
  return useMutation({
    mutationFn: (data: GroupUpdateSchema) => updateGroup(id, data),
    mutationKey: ["group", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
