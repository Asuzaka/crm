import { useMutation } from "@tanstack/react-query";
import { updateLessons } from "../../../shared/api/endpoints";

export function useUpdateLessons() {
  return useMutation({ mutationFn: updateLessons, mutationKey: ["lessons"] });
}
