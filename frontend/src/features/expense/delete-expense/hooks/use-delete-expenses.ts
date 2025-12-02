import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { deleteExpenses } from "@/entities/expense";

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
