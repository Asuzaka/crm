export const ROUTES = {
  // General
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  notFound: "*",

  // Users
  users: {
    main: "/users",
    create: "/users/new",
    view: "/users/:id",
    edit: "/users/:id/edit",

    d: {
      view: (id: string) => `/users/${id}`,
      edit: (id: string) => `/users/${id}/edit`,
    },
  },

  // Students
  students: {
    main: "/students",
    create: "/students/new",
    view: "/students/:id",
    edit: "/students/:id/edit",

    d: {
      view: (id: string) => `/students/${id}`,
      edit: (id: string) => `/students/${id}/edit`,
    },
  },

  // History
  history: {
    main: "/history",
    view: "/history/:id",

    d: {
      view: (id: string) => `/history/${id}`,
    },
  },

  // Income
  income: {
    main: "/income",
    create: "/incomes/new",
    view: "/incomes/:id",
    edit: "/incomes/:id/edit",

    d: {
      view: (id: string) => `/incomes/${id}`,
      edit: (id: string) => `/incomes/${id}/edit`,
    },
  },

  // Expenses
  expenses: {
    main: "/expenses",
    view: "/expenses/:id",
    edit: "/expenses/:id/edit",

    d: {
      view: (id: string) => `/expenses/${id}`,
      edit: (id: string) => `/expenses/${id}/edit`,
    },
  },

  // Groups
  groups: {
    main: "/groups",
    create: "/groups/new",
    view: "/groups/:id",
    edit: "/groups/:id/edit",

    d: {
      view: (id: string) => `/groups/${id}`,
      edit: (id: string) => `/groups/${id}/edit`,
    },
  },
} as const;

export type AppRoute = string | (typeof ROUTES)[keyof typeof ROUTES];
