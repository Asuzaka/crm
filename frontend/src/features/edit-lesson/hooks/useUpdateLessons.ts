import { useMutation } from "@tanstack/react-query";
import { updateLessons } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";

export function useUpdateLessons() {
  return useMutation({
    mutationFn: updateLessons,
    mutationKey: ["lessons"],
    onSuccess: () => {
      toast.success("Lessons updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update lessons");
    },
  });
}
