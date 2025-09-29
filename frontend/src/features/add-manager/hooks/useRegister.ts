import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";

export function useRegister() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => toast.success("User Created!"),
    onError: (err) => toast.error(err.message),
  });
}
