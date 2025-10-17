// Static imports for global pieces
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../../layout/auth-layout/ui/authLayout";
import { MainLayout } from "../../layout/main-layout";
import { ROUTES } from "../../../shared/consts/routes";
import { NotFound } from "../../../pages/not-found";
import { ProtectedRoute } from "./protectedRoute";
import { lazyImport } from "../../../shared/lib/lazy-import";
import { SuspenseWrapper } from "../../../shared/lib/suspense-wrapper";

// Lazy imports for pages
const Login = lazyImport(() => import("../../../pages/login/ui/loginPage"), "Login");
const DashboardPage = lazyImport(() => import("../../../pages/dashboard"), "DashboardPage");
const Students = lazyImport(() => import("../../../pages/students"), "Students");
const CreateStudentPage = lazyImport(() => import("../../../pages/add-student"), "CreateStudentPage");
const StudentUpdatePage = lazyImport(() => import("../../../pages/edit-student"), "StudentUpdatePage");
const CreateUserPage = lazyImport(() => import("../../../pages/add-manager"), "CreateUserPage");
const EditManager = lazyImport(() => import("../../../pages/edit-manager"), "EditManager");
const ViewStudent = lazyImport(() => import("../../../pages/view-student"), "ViewStudent");
const ViewManager = lazyImport(() => import("../../../pages/view-manager"), "ViewManager");
const Managers = lazyImport(() => import("../../../pages/managers"), "Managers");
const Income = lazyImport(() => import("../../../pages/income"), "Income");
const Expenses = lazyImport(() => import("../../../pages/expenses"), "Expenses");
const Groups = lazyImport(() => import("../../../pages/groups"), "Groups");
const Activity = lazyImport(() => import("../../../pages/activity"), "Activity");
const ActivityView = lazyImport(() => import("../../../pages/view-activity"), "ActivityView");
const GroupView = lazyImport(() => import("../../../pages/view-group"), "GroupView");
const GroupEdit = lazyImport(() => import("../../../pages/edit-group"), "GroupEdit");
const CreateGroupPage = lazyImport(() => import("../../../pages/add-group"), "CreateGroupPage");
const ExpenseUpdate = lazyImport(() => import("../../../pages/edit-expense"), "ExpenseUpdate");
const ExpenseView = lazyImport(() => import("../../../pages/view-expense"), "ExpenseView");
const CreatePaymentPage = lazyImport(() => import("../../../pages/add-income"), "CreatePaymentPage");
const IncomeEdit = lazyImport(() => import("../../../pages/edit-income"), "IncomeEdit");
const IncomeView = lazyImport(() => import("../../../pages/view-income"), "IncomeView");

const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: (
      <SuspenseWrapper>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES.home,
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </SuspenseWrapper>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.dashboard, element: <DashboardPage /> },
      { path: ROUTES.addManager, element: <CreateUserPage /> },
      { path: ROUTES.managers, element: <Managers /> },
      { path: ROUTES.editManager, element: <EditManager /> },
      { path: ROUTES.viewManager, element: <ViewManager /> },
      { path: ROUTES.activity, element: <Activity /> },
      { path: ROUTES.viewActivity, element: <ActivityView /> },
      { path: ROUTES.students, element: <Students /> },
      { path: ROUTES.addStudent, element: <CreateStudentPage /> },
      { path: ROUTES.editStudent, element: <StudentUpdatePage /> },
      { path: ROUTES.viewStudent, element: <ViewStudent /> },
      { path: ROUTES.income, element: <Income /> },
      { path: ROUTES.addIncome, element: <CreatePaymentPage /> },
      { path: ROUTES.viewIncome, element: <IncomeView /> },
      { path: ROUTES.editIncome, element: <IncomeEdit /> },
      { path: ROUTES.expenses, element: <Expenses /> },
      { path: ROUTES.viewExpense, element: <ExpenseView /> },
      { path: ROUTES.editExpense, element: <ExpenseUpdate /> },
      { path: ROUTES.groups, element: <Groups /> },
      { path: ROUTES.addGroup, element: <CreateGroupPage /> },
      { path: ROUTES.viewGroup, element: <GroupView /> },
      { path: ROUTES.editGroup, element: <GroupEdit /> },
    ],
  },
  { path: ROUTES.notFound, element: <NotFound full={true} /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
