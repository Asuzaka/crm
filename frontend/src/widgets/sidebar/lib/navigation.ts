import type { User } from "../../../entities/user";
import {
  HomeIcon,
  UsersIcon,
  LayersIcon,
  DollarSignIcon,
  UserIcon,
  ClipboardListIcon,
  CreditCardIcon,
} from "lucide-react";
import { ROUTES } from "../../../shared/consts/routes";

type panels = "dashboard" | "students" | "groups" | "income" | "expences" | "users" | "history";

export interface NavigationPanelType {
  key: panels;
  name: string;
  href: string;
  icon: React.ElementType;
}

export function getNavigation(currentUser: User | null) {
  const navigation: NavigationPanelType[] = [
    { key: "dashboard", name: "Dashboard", href: ROUTES.dashboard, icon: HomeIcon },
    { key: "students", name: "Students", href: ROUTES.students.main, icon: UsersIcon },
    { key: "groups", name: "Groups", href: ROUTES.groups.main, icon: LayersIcon },
    { key: "income", name: "Income", href: ROUTES.income.main, icon: DollarSignIcon },
    { key: "expences", name: "Expenses", href: ROUTES.expenses.main, icon: CreditCardIcon },
    { key: "users", name: "Users", href: ROUTES.users.main, icon: UserIcon },
    { key: "history", name: "History", href: ROUTES.history.main, icon: ClipboardListIcon },
  ];

  if (!currentUser) return [];

  return navigation.filter((panel) => currentUser.permissions[panel.key].access);
}
