import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SearchType } from "../../../shared/components/multi-field";
import type { IncomeCreateSchemaType } from "../../../features/add-income";
import { SelectOneFieldDynamicSearch } from "../../../shared/components/select-search-field";
import { DollarSignIcon, FileTextIcon } from "lucide-react";
import { searchStudents } from "../../../shared/api/endpoints/student";
import { searchGroups } from "../../../shared/api/endpoints/group";

interface FormProps {
  register: UseFormRegister<IncomeCreateSchemaType>;
  errors: FieldErrors<IncomeCreateSchemaType>;
  control: Control<IncomeCreateSchemaType>;
  disabled?: boolean;
  student?: SearchType | null;
  group?: SearchType | null;
}

export function Form({
  register,
  errors,
  control,
  student,
  group,
  disabled = false,
}: FormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student */}
        <div>
          <label
            htmlFor="student"
            className="block text-sm font-medium text-gray-700"
          >
            Student *
          </label>
          <SelectOneFieldDynamicSearch
            disabled={disabled}
            name="student"
            initialValue={student}
            control={control}
            fetchOptions={searchStudents}
          ></SelectOneFieldDynamicSearch>
          {errors.student && (
            <p className="mt-1 text-sm text-red-600">
              {errors.student.message}
            </p>
          )}
        </div>
        {/* Group */}
        <div>
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700"
          >
            Group *
          </label>
          <SelectOneFieldDynamicSearch
            disabled={disabled}
            name="group"
            initialValue={group}
            control={control}
            fetchOptions={searchGroups}
          ></SelectOneFieldDynamicSearch>
          {errors.group && (
            <p className="mt-1 text-sm text-red-600">{errors.group.message}</p>
          )}
        </div>
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSignIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="amount"
              {...register("amount", { valueAsNumber: true })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.amount ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="0"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        {/* Payment Method */}
        <div>
          <label
            htmlFor="method"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method *
          </label>
          <select
            id="method"
            {...register("method")}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
              errors.method ? "border-red-300" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
          >
            <option value="cash">Cash</option>
            <option value="card">Credit Card</option>
            <option value="bank">Bank Transfer</option>
          </select>
          {errors.method && (
            <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>
          )}
        </div>
      </div>
      {/* Notes */}
      <div className="mt-6">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileTextIcon className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Additional payment details..."
          />
        </div>
      </div>
    </div>
  );
}
