import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
