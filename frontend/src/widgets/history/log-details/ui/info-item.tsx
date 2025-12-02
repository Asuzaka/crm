import type { LucideIcon } from "lucide-react";

export function InfoItem({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        {Icon && <Icon className="h-5 w-5 mr-2 text-gray-400" />}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{children}</dd>
    </div>
  );
}
