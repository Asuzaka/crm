import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteExpenses } from "../../../shared/api/endpoints/expense";
import toast from "react-hot-toast";

export function useDeleteExpenses(id: string[]) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteExpenses(id),
    mutationKey: ["expenses"],
    onSuccess: () => {
      navigate("/expenses");
      toast.success("Expense deleted Succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
