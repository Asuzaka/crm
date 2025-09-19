import { useMutation } from "@tanstack/react-query";
import { deleteStudent } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";
import { queryClient } from "../../../shared/api/queryClient";
import { useNavigate } from "react-router";

export function useDeleteStudent(id: string[]){ 
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => deleteStudent(id),
    onSuccess: () => {
      navigate("/students")
      toast.success("User deleted Succesfully")
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
