import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../shared/consts/routes";
import { Loader } from "../../../shared/components";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuthStore();

  if (loading) return <Loader />;

  if (!currentUser) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
}
