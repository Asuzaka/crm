import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type perms = "access" | "create" | "update" | "delete";
const perms: perms[] = ["access", "create", "update", "delete"];

const PERMISSION_SECTIONS = [
  { key: "students", label: "Students" },
  { key: "users", label: "Users" },
  { key: "dashboard", label: "Dashboard" },
  { key: "expences", label: "Expenses" },
  { key: "income", label: "Income" },
  { key: "groups", label: "Groups" },
  { key: "history", label: "History" },
] as const;

type PermissionsOnly = {
  permissions: {
    [K in (typeof PERMISSION_SECTIONS)[number]["key"]]: {
      [P in perms]: boolean;
    };
  };
};

export interface PermissionsProps<TForm extends FieldValues & PermissionsOnly> {
  register: UseFormRegister<TForm>;
}

export function Permissions<TForm extends FieldValues & PermissionsOnly>({ register }: PermissionsProps<TForm>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Module</th>
            {perms.map((perm) => (
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                {perm.charAt(0).toLocaleUpperCase() + perm.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {PERMISSION_SECTIONS.map(({ key, label }) => (
            <tr key={key} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 font-medium text-gray-900">{label}</td>
              {perms.map((perm) => (
                <td key={perm} className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    {...register(`permissions.${key}.${perm}` as Path<TForm>)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
