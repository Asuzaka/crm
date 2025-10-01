import type { IncomeUpdateSchemaType } from "..";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../shared/api/queryClient";
import { updatePayment } from "../../../shared/api/endpoints/payment";
import toast from "react-hot-toast";

export function useUpdateIncome(id: string) {
  return useMutation({
    mutationFn: (data: IncomeUpdateSchemaType) => updatePayment(id, data),
    mutationKey: ["income", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast.success("Income updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update income");
    },
  });
}
