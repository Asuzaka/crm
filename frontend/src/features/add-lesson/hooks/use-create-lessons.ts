import { createLessons } from "@/entities/lesson";
import { useMutation } from "@tanstack/react-query";

export function useCreateLessons() {
  return useMutation({ mutationFn: createLessons, mutationKey: ["lessons"] });
}
