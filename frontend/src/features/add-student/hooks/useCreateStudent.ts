import { useMutation } from "@tanstack/react-query";
import { createStudent } from "../../../shared/api/endpoints/student";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useCreateStudent() {
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student created successfully ✅");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create student");
    },
  });
}
