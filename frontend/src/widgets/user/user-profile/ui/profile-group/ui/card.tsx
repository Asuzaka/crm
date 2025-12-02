import clsx from "clsx";
import { Link } from "react-router";
import { ROUTES } from "../../../../../../shared/consts/routes";

export function GroupCard({ id, name }: { id: string; name: string }) {
  return (
    <div
      className={clsx(
        "p-4 rounded-lg border transition-colors",
        "bg-blue-50 border-blue-100 hover:border-blue-200 hover:bg-blue-100/50"
      )}
    >
      <h4 className="text-md font-medium text-blue-900">{name}</h4>
      <div className="mt-4 flex justify-end">
        <Link
          to={ROUTES.groups.d.view(id)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Group
        </Link>
      </div>
    </div>
  );
}
