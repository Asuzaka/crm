import type { StudentUpdateSchemaType } from "@/features/student";
import { queryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { updateStudent } from "../api/api";
import toast from "react-hot-toast";

export function useUpdateStudent(id: string) {
  return useMutation({
    mutationFn: (data: Partial<StudentUpdateSchemaType>) => updateStudent(id, data),
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
