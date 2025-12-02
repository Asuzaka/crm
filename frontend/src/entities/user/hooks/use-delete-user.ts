import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUsers } from "../api/api";
import toast from "react-hot-toast";

export function useDeleteUser(id: string[]) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteUsers(id),
    mutationKey: ["users"],
    onSuccess: () => {
      navigate("/managers");
      toast.success("User deleted Succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
