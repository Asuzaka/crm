import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { deletePayments } from "../api/api";

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
