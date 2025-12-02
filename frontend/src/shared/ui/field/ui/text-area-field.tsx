import type { FieldError } from "react-hook-form";
import { FieldErrorText } from "./field-error";

export interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label: string;
  error?: FieldError | null;
}

export function TextAreaField({ id, label, error, ...props }: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          id={id}
          {...props}
          className={`block w-full border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
      </div>
      <FieldErrorText message={error?.message} />
    </div>
  );
}
