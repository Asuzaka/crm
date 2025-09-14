import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../shared/consts/routes";
import { Outlet } from "react-router";

export function ProtectedRoute(){

  const { currentUser, loading } = useAuthStore();

  if(loading) return <p>Loading...</p>;

  if(!currentUser){
    return <Navigate to={ROUTES.login} replace />
  }

  return <Outlet/>
}
