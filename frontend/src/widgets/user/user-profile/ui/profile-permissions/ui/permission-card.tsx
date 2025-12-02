import clsx from "clsx";

type PermissionCardProps = {
  label: string;
  active: boolean;
};

export function PermissionCard({ label, active }: PermissionCardProps) {
  return (
    <div
      className={clsx(
        "p-4 rounded-lg border transition-colors",
        active ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
      )}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "h-5 w-5 rounded-full mr-3 flex items-center justify-center",
            active ? "bg-green-500" : "bg-gray-300"
          )}
        >
          {active && (
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={clsx("text-sm font-medium", active ? "text-green-900" : "text-gray-500")}>{label}</span>
      </div>
    </div>
  );
}
