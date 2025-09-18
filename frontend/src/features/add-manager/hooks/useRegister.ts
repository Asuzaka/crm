import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../shared/api/endpoints";

export function useRegister(){

  return useMutation({
    mutationFn : createUser,
  })
}
