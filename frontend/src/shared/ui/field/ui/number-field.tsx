import type { LucideIcon } from "lucide-react";
import type { FieldError } from "react-hook-form";
import { FieldErrorText } from "./field-error";

export interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  error?: FieldError | null;
  icon?: LucideIcon | null;
  suffix?: string;
}

export function NumberField({ id, label, error, suffix, icon: Icon, ...props }: NumberFieldProps) {
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
        <input
          id={id}
          type="number"
          {...props}
          className={`block w-full ${Icon ? "pl-10" : ""} pr-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
      <FieldErrorText message={error?.message} />
    </div>
  );
}
