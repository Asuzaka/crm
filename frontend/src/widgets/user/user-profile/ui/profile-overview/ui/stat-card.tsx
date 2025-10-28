import clsx from "clsx";

export type StatCardProps = {
  label: string;
  value: React.ReactNode;
  color: "blue" | "green" | "yellow";
};

export function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = clsx(
    {
      blue: "bg-blue-50 text-blue-800",
      green: "bg-green-50 text-green-800",
      yellow: "bg-yellow-50 text-yellow-800",
    }[color]
  );

  const valueColorClasses = clsx(
    {
      blue: "text-blue-900",
      green: "text-green-900",
      yellow: "text-yellow-900",
    }[color]
  );

  return (
    <div className={clsx("p-4 rounded-lg", colorClasses)}>
      <p className="text-sm font-medium">{label}</p>
      <p className={clsx("text-2xl font-semibold", valueColorClasses)}>{value}</p>
    </div>
  );
}
