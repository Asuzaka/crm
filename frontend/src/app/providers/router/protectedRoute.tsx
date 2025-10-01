import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../shared/consts/routes";
import { Loader } from "../../../shared/components/loader";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuthStore();

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!currentUser) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
}
