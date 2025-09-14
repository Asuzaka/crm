import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../shared/api/endpoints/createUser";

export function useRegister(){

  return useMutation({
    mutationFn : createUser,
  })
}
