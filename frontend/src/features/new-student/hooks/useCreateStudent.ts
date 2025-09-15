import { useMutation } from "@tanstack/react-query";
import { createStudent } from "../../../shared/api/endpoints/createStudent";
import { queryClient } from "../../../shared/api/queryClient";

export function useCreateStudent() {
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}
