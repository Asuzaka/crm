import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { RegisterFormData } from "../../../features/add-manager";
import { MultiSelectField } from "../../../shared/components";
import { searchGroups } from "../../../shared/api/endpoints";
import type { Option } from "../../../shared/components/multiFieldSelect";

interface FormProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  control: Control<RegisterFormData>;
  availableGroups?: Option[] | undefined;
}

export function Form({
  register,
  errors,
  control,
  availableGroups,
}: FormProps) {
  return (
    <>
      {/* --- Basic Info --- */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="mt-1 block w-full border rounded-md py-2 px-3 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full border rounded-md py-2 px-3 sm:text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full border rounded-md py-2 px-3 sm:text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* --- Permissions --- */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Permissions</h3>
        <div className="space-y-3 bg-gray-50 p-4 rounded-md">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("permissions.addStudents")}
              className="h-4 w-4"
            />
            <span>Can add new students</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("permissions.deleteStudents")}
              className="h-4 w-4"
            />
            <span>Can delete students</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("permissions.addPayments")}
              className="h-4 w-4"
            />
            <span>Can process payments</span>
          </label>
        </div>
      </div>

      {/* --- Responsible Groups --- */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Responsible Groups
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          Select the groups this manager will be responsible for:
        </p>
        <MultiSelectField
          initialGroup={availableGroups}
          control={control}
          name="responsible"
          label="Responsible"
          fetchOptions={searchGroups}
        />

        {errors.responsible && (
          <p className="text-red-500 text-sm">
            {errors.responsible.message as string}
          </p>
        )}
      </div>
      <input type="hidden" {...register("role")} value="manager" />
    </>
  );
}
