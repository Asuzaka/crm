import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => toast.success("User Created!"),
    onError: (err) => toast.error(err.message),
  });
}
