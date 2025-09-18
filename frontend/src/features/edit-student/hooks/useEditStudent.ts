import { useMutation } from "@tanstack/react-query";
import { updateStudent } from "../../../shared/api/endpoints";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useEditStudent() {
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student edited successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to edit student");
    },
  });
}
