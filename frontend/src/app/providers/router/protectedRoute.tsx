import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../shared/consts/routes";
import { Outlet } from "react-router";
import { Loader } from "../../../shared/components";

export function ProtectedRoute() {
  const { currentUser, loading } = useAuthStore();

  if (loading) return <Loader />;

  if (!currentUser) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
}
