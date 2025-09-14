export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  newManager: "/register",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
