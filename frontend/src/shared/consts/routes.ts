export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  addManager: "/register",
  managers: "/managers",
  editManager: "/managers/:id/edit",
  viewManager: "/managers/:id",
  students: "/students",
  activity: "/activity",
  viewActivity: "/activity/:id",
  income: "/income",
  expenses: "/expenses",
  groups: "/groups",
  addGroup: "/groups/new",
  viewGroup: "/groups/:id",
  editGroup: "/groups/:id/edit",
  addStudent: "/students/new",
  editStudent: "/students/:id/edit",
  viewStudent: "/students/:id",
  notFound: "*",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
