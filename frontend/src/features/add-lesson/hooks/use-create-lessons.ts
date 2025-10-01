import { useMutation } from "@tanstack/react-query";
import { createLessons } from "../../../shared/api/endpoints/lesson";

export function useCreateLessons() {
  return useMutation({ mutationFn: createLessons, mutationKey: ["lessons"] });
}
