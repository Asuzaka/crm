import { useMutation } from "@tanstack/react-query";
import { updateStudent } from "../../../shared/api/endpoints";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useUpdateStudent(id: string) {
  return useMutation({
    mutationFn: updateStudent,
    mutationKey: ["student", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student edited");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to edit student");
    },
  });
}
