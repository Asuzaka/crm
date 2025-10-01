import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../app/providers/store/authStore";
import { logout as logoutapi } from "../../../shared/api/endpoints/auth";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/consts/routes";
import toast from "react-hot-toast";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutapi,
    onSuccess: () => {
      logout();
      navigate(ROUTES.login);
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
}
