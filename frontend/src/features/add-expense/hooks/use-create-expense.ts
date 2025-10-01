import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExpense } from "../../../shared/api/endpoints/expense";

export function useCreateExpense() {
  return useMutation({
    mutationFn: createExpense,
    mutationKey: ["expenses"],
    onSuccess: () => toast.success("Expense Created!"),
    onError: (err) => toast.error(err.message),
  });
}
