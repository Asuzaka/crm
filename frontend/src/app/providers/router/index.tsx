// Static imports for global pieces
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../../layout/auth-layout/ui/authLayout";
import { MainLayout } from "../../layout/main-layout";
import { ROUTES } from "../../../shared/consts/routes";
import { NotFound } from "../../../pages/error";
import { ProtectedRoute } from "./protectedRoute";
import { lazyImport } from "../../../shared/lib/lazy-import";
import { SuspenseWrapper } from "../../../shared/lib/suspense-wrapper";

// Lazy imports for pages
// Auth
const Login = lazyImport(() => import("@/pages/auth"), "Login");

// Dashboard
const DashboardPage = lazyImport(() => import("../../../pages/dashboard"), "DashboardPage");

// Users
const UsersPage = lazyImport(() => import("../../../pages/user"), "Users");
const AddUserPage = lazyImport(() => import("../../../pages/user"), "AddUser");
const EditUserPage = lazyImport(() => import("../../../pages/user"), "EditUser");
const ViewUserPage = lazyImport(() => import("../../../pages/user"), "ViewUser");

// Students
const StudentsPage = lazyImport(() => import("../../../pages/student"), "Students");
const CreateStudentPage = lazyImport(() => import("../../../pages/student"), "CreateStudentPage");
const EditStudentPage = lazyImport(() => import("../../../pages/student"), "StudentUpdatePage");
const ViewStudentPage = lazyImport(() => import("../../../pages/student"), "ViewStudent");

// Groups
const GroupsPage = lazyImport(() => import("../../../pages/group"), "Groups");
const CreateGroupPage = lazyImport(() => import("../../../pages/group"), "CreateGroupPage");
const EditGroupPage = lazyImport(() => import("../../../pages/group/edit-group"), "GroupEdit");
const ViewGroupPage = lazyImport(() => import("../../../pages/group"), "GroupView");

// History
const HistoryPage = lazyImport(() => import("../../../pages/history"), "History");
const ViewHistoryPage = lazyImport(() => import("../../../pages/history"), "HistoryView");

// Income
const IncomePage = lazyImport(() => import("../../../pages/income"), "Income");
const CreateIncomePage = lazyImport(() => import("../../../pages/income"), "CreatePaymentPage");
const EditIncomePage = lazyImport(() => import("../../../pages/income"), "IncomeEdit");
const ViewIncomePage = lazyImport(() => import("../../../pages/income"), "IncomeView");

// Expenses
const ExpensesPage = lazyImport(() => import("../../../pages/expense"), "Expenses");
const EditExpensePage = lazyImport(() => import("../../../pages/expense"), "ExpenseUpdate");
const ViewExpensePage = lazyImport(() => import("../../../pages/expense"), "ExpenseView");

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
      // Dashboard
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.dashboard, element: <DashboardPage /> },

      // Users
      { path: ROUTES.users.main, element: <UsersPage /> },
      { path: ROUTES.users.create, element: <AddUserPage /> },
      { path: ROUTES.users.view, element: <ViewUserPage /> },
      { path: ROUTES.users.edit, element: <EditUserPage /> },

      // Students
      { path: ROUTES.students.main, element: <StudentsPage /> },
      { path: ROUTES.students.create, element: <CreateStudentPage /> },
      { path: ROUTES.students.view, element: <ViewStudentPage /> },
      { path: ROUTES.students.edit, element: <EditStudentPage /> },

      // Groups
      { path: ROUTES.groups.main, element: <GroupsPage /> },
      { path: ROUTES.groups.create, element: <CreateGroupPage /> },
      { path: ROUTES.groups.view, element: <ViewGroupPage /> },
      { path: ROUTES.groups.edit, element: <EditGroupPage /> },

      // History
      { path: ROUTES.history.main, element: <HistoryPage /> },
      { path: ROUTES.history.view, element: <ViewHistoryPage /> },

      // Income
      { path: ROUTES.income.main, element: <IncomePage /> },
      { path: ROUTES.income.create, element: <CreateIncomePage /> },
      { path: ROUTES.income.view, element: <ViewIncomePage /> },
      { path: ROUTES.income.edit, element: <EditIncomePage /> },

      // Expenses
      { path: ROUTES.expenses.main, element: <ExpensesPage /> },
      { path: ROUTES.expenses.view, element: <ViewExpensePage /> },
      { path: ROUTES.expenses.edit, element: <EditExpensePage /> },
    ],
  },
  { path: ROUTES.notFound, element: <NotFound full={true} /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
