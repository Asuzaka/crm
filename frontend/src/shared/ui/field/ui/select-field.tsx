import type { FieldError } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { FieldErrorText } from "./field-error";

export type Option = string | { value: string | number; label: string };

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label: string;
  options: Option[];
  error?: FieldError | null;
  icon?: LucideIcon | null;
}

export function SelectField({ id, label, options, error, icon: Icon, children, ...props }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <select
          id={id}
          {...props}
          className={`block w-full ${Icon ? "pl-10" : "pl-3"} border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm py-2 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        >
          {children ?? (
            <>
              {options.map((o, idx) =>
                typeof o === "string" ? (
                  <option key={idx} value={o}>
                    {o}
                  </option>
                ) : (
                  <option key={idx} value={o.value}>
                    {o.label}
                  </option>
                )
              )}
            </>
          )}
        </select>
      </div>
      <FieldErrorText message={error?.message} />
    </div>
  );
}
