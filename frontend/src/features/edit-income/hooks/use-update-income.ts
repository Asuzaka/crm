import { useMutation } from "@tanstack/react-query";
import type { IncomeUpdateSchemaType } from "..";
import { updatePayment } from "../../../shared/api/endpoints";
import { queryClient } from "../../../shared/api/queryClient";
import toast from "react-hot-toast";

export function useUpdateIncome(id: string) {
  return useMutation({
    mutationFn: (data: IncomeUpdateSchemaType) => updatePayment(id, data),
    mutationKey: ["income", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast.success("Income updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update income");
    },
  });
}
