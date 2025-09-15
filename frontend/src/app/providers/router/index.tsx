import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import { Login } from "../../../pages/login/ui/loginPage";
import { AuthLayout } from "../../layout/auth-layout/ui/authLayout";
import { MainLayout } from "../../layout/main-layout";
import { ROUTES } from "../../../shared/consts/routes";
import { DashboardPage } from "../../../pages/dashboard";
import { Register } from "../../../pages/new-manager";
import { Students } from "../../../pages/students";

const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: ROUTES.home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.dashboard,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.newManager,
        element: <Register />
      },
      {
        path: ROUTES.students,
        element: <Students />
      }
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
