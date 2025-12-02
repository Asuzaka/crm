import { createPayment } from "@/entities/income";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateIncome() {
  return useMutation({
    mutationFn: createPayment,
    mutationKey: ["incomes"],
    onSuccess: () => toast.success("Payment Created!"),
    onError: (err) => toast.error(err.message),
  });
}
