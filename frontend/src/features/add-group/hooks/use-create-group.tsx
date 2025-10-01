import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../../../shared/api/endpoints/group";
import toast from "react-hot-toast";

export function useCreateGroup() {
  return useMutation({
    mutationFn: createGroup,
    mutationKey: ["groups"],
    onSuccess: () => toast.success("Group Created!"),
    onError: (err) => toast.error(err.message),
  });
}
