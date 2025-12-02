import { useMutation } from "@tanstack/react-query";
import { createUser } from "..";
import toast from "react-hot-toast";

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => toast.success("User Added!"),
    onError: (err) => toast.error(err.message),
  });
}
