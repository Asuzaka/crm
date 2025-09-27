import { useMutation } from "@tanstack/react-query";
import { deletePayments } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteIncomes(id: string[]) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deletePayments(id),
    mutationKey: ["incomes"],
    onSuccess: () => {
      navigate("/income");
      toast.success("Reciept deleted Succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
