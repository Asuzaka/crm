import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../../../shared/api/endpoints";

export function useCreateGroup() {
  return useMutation({ mutationFn: createGroup, mutationKey: ["groups"] });
}
