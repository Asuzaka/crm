import type { User } from "../../../../../../entities/user";
import { InfoItem, type InfoItemProps } from "./info-item";
import { StatCard, type StatCardProps } from "./stat-card";
import { ClockIcon, LayersIcon, ShieldIcon, UserIcon } from "lucide-react";

export function Overview({ user }: { user: User }) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedLastLogin = user.lastLogin && new Date(user.lastLogin).toLocaleString();

  const infoItems: InfoItemProps[] = [
    { icon: UserIcon, label: "Full Name", value: user.name },
    { icon: UserIcon, label: "Email", value: user.email },
    {
      icon: ClockIcon,
      label: "Date Joined",
      value: formattedDate,
    },
    {
      icon: LayersIcon,
      label: "Responsible Groups",
      value: user.groups.length
        ? user.groups.map((g, i) => (
            <span key={g._id}>
              {g.name}
              {i < user.groups.length - 1 && ", "}
            </span>
          ))
        : "—",
    },
    {
      icon: ShieldIcon,
      label: "Role",
      value: <span className="capitalize">{user.role}</span>,
    },
  ];

  const stats: StatCardProps[] = [
    {
      label: "Total Actions",
      value: user.activity,
      color: "blue",
    },
    {
      label: "Last Active",
      value: <span className="text-lg font-semibold">{formattedLastLogin}</span>,
      color: "green",
    },
    {
      label: "Groups Managed",
      value: user.groups.length,
      color: "yellow",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">User Information</h3>
      </div>

      <div className="px-6 py-5">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          {infoItems.map((item) => (
            <InfoItem key={item.label} {...item} />
          ))}
        </dl>
      </div>

      <div className="px-6 py-5 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
