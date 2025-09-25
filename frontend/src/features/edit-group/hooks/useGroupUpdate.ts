import { useMutation } from "@tanstack/react-query";
import { updateGroup } from "../../../shared/api/endpoints";
import type { GroupUpdateSchema } from "../model/schema";

export function useGroupUpdate(id: string) {
  return useMutation({
    mutationFn: (data: GroupUpdateSchema) => updateGroup(id, data),
    mutationKey: ["groups"],
  });
}
