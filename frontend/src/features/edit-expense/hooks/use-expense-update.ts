import type { ExpenseUpdateSchemaType } from "..";
import { useMutation } from "@tanstack/react-query";
import { updateExpense } from "../../../shared/api/endpoints/expense";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useExpenseUpdate(id: string) {
  return useMutation({
    mutationFn: (data: ExpenseUpdateSchemaType) => updateExpense(id, data),
    mutationKey: ["expense", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update expense");
    },
  });
}
