import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../app/providers/store/authStore";
import { login } from "../../../shared/api/endpoints";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/consts/routes";

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.data);
      navigate(ROUTES.home)
    },
  });
}

