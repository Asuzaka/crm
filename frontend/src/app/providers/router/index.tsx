import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import { Login } from "../../../pages/login/ui/loginPage";
import { AuthLayout } from "../../layout/auth-layout/ui/authLayout";
import { MainLayout } from "../../layout/main-layout";
import { ROUTES } from "../../../shared/consts/routes";
import { DashboardPage } from "../../../pages/dashboard";
import { Students } from "../../../pages/students";
import { Testing } from "../../../testing";
import { AddStudent } from "../../../pages/add-student";
import { EditStudent } from "../../../pages/edit-student/ui/editStudent";
import { Register } from "../../../pages/add-manager";
import { EditManager } from "../../../pages/edit-manager";
import { ViewStudent } from "../../../pages/view-student";
import { ViewManager } from "../../../pages/view-manager";
import { Managers } from "../../../pages/managers";
import { Income } from "../../../pages/income";
import { Expenses } from "../../../pages/expenses";
import { Groups } from "../../../pages/groups";
import { NotFound } from "../../../pages/not-found";
import { Activity } from "../../../pages/activity";
import { ActivityView } from "../../../pages/view-activity";
import { GroupView } from "../../../pages/view-group";
import { GroupEdit } from "../../../pages/edit-group";
import { GroupAdd } from "../../../pages/add-group";
import { ProtectedRoute } from "./protectedRoute";
import { ExpenseUpdate } from "../../../pages/edit-expense";
import { ExpenseView } from "../../../pages/view-expense";
import { PaymentNew } from "../../../pages/add-income";
import { IncomeEdit } from "../../../pages/edit-income";
import { IncomeView } from "../../../pages/view-income";

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
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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
        path: ROUTES.addManager,
        element: <Register />,
      },
      {
        path: ROUTES.managers,
        element: <Managers />,
      },
      {
        path: ROUTES.editManager,
        element: <EditManager />,
      },
      {
        path: ROUTES.viewManager,
        element: <ViewManager />,
      },
      {
        path: ROUTES.activity,
        element: <Activity />,
      },
      { path: ROUTES.viewActivity, element: <ActivityView /> },
      {
        path: ROUTES.students,
        element: <Students />,
      },
      {
        path: ROUTES.addStudent,
        element: <AddStudent />,
      },
      { path: ROUTES.editStudent, element: <EditStudent /> },
      { path: ROUTES.viewStudent, element: <ViewStudent /> },
      {
        path: ROUTES.income,
        element: <Income />,
      },
      { path: ROUTES.addIncome, element: <PaymentNew /> },
      { path: ROUTES.viewIncome, element: <IncomeView /> },
      { path: ROUTES.editIncome, element: <IncomeEdit /> },
      {
        path: ROUTES.expenses,
        element: <Expenses />,
      },
      { path: ROUTES.viewExpense, element: <ExpenseView /> },
      { path: ROUTES.editExpense, element: <ExpenseUpdate /> },
      {
        path: ROUTES.groups,
        element: <Groups />,
      },
      { path: ROUTES.addGroup, element: <GroupAdd /> },
      { path: ROUTES.viewGroup, element: <GroupView /> },
      { path: ROUTES.editGroup, element: <GroupEdit /> },
      { path: "/t", element: <Testing /> },
    ],
  },
  {
    path: ROUTES.notFound,
    element: <NotFound full={true} />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
