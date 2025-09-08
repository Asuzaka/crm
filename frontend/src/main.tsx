import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./shared/lib/i18n/index.ts";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: route.AUTH.SIGNIN.ROOT, element: <SignIn /> },
      { path: route.AUTH.SIGNUP.ROOT, element: <SignUp /> },
      { path: route.AUTH.VERIFY.ROOT, element: <Verify /> },
      { path: route.AUTH.FORGET.ROOT, element: <ForgetPassword /> },
      { path: route.AUTH.RESET.ROOT, element: <ResetPassword /> },
      {
        path: route.DASHBOARD.ROOT,
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: route.TEMPLATE.CREATE,
        element: (
          <Protected>
            <NewTemplate Template={undefined} editor={true} />
          </Protected>
        ),
      },
      {
        path: route.TEMPLATE.DETAIL,
        element: <Template />,
      },
      {
        path: route.FORM.ROOT,
        element: (
          <Protected>
            <FormPage />
          </Protected>
        ),
      },
      {
        path: route.FORM.SUBMITTED,
        element: (
          <Protected>
            <SubmittedForm />
          </Protected>
        ),
      },
      {
        path: route.GITHUB.ROOT,
        element: <GitHubCallback />,
      },
      {
        path: route.NOTFOUND.ROOT,
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
