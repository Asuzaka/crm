import { useMutation } from "@tanstack/react-query";
import { deleteGroup } from "../../../shared/api/endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteGroup(id: string[]) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteGroup(id),
    mutationKey: ["groups"],
    onSuccess: () => {
      navigate("/groups");
      toast.success("Group deleted Succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
