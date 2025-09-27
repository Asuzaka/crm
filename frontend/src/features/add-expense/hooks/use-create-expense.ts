import { useMutation } from "@tanstack/react-query";
import { createExpense } from "../../../shared/api/endpoints";

export function useCreateExpense() {
  return useMutation({ mutationFn: createExpense, mutationKey: ["expenses"] });
}
