import { type ReactNode } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFilterProps {
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  placeholder?: string;
}

export function SelectFilter({ icon, value, onChange, options, className = "" }: SelectFilterProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative bg-white rounded-lg shadow">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        >
          {options.length === 0 && <option disabled>No options</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
