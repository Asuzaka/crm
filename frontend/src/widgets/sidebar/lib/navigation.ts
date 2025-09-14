import { HomeIcon, UsersIcon, LayersIcon, DollarSignIcon, UserIcon, ClipboardListIcon, UserPlusIcon } from "lucide-react";
import type { User } from "../../../entities/user";

export function getNavigation(currentUser: User | null) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Students", href: "/students", icon: UsersIcon },
    { name: "Groups", href: "/groups", icon: LayersIcon },
    { name: "Income", href: "/income", icon: DollarSignIcon },
  ];

  if (currentUser?.role === "owner") {
    navigation.push(
      { name: "Managers", href: "/managers", icon: UserIcon },
      { name: "Activity History", href: "/activity", icon: ClipboardListIcon },
      { name: "Register Manager", href: "/register", icon: UserPlusIcon },
    );
  }

  return navigation;
}
