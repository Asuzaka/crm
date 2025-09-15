export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  newManager: "/register",
  managers: "/managers",
  students: "/students",
  activity: "/activity",
  income: "/income",
  expences: "/expences",
  groups: "/groups",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
