import { useMutation } from "@tanstack/react-query";
import { createExpense } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";

export function useCreateExpense() {
  return useMutation({
    mutationFn: createExpense,
    mutationKey: ["expenses"],
    onSuccess: () => toast.success("Expense Created!"),
    onError: (err) => toast.error(err.message),
  });
}
