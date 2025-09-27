import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../../../shared/api/endpoints/payment";

export function useCreateIncome() {
  return useMutation({ mutationFn: createPayment, mutationKey: ["incomes"] });
}
