import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { deleteStudent } from "../api/api";

export function useDeleteStudent(id: string[]) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["students"],
    mutationFn: () => deleteStudent(id),
    onSuccess: () => {
      navigate("/students");
      toast.success("User deleted Succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
