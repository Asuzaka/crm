import { UserIcon, DollarSignIcon, ClockIcon } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import {
  MultiSelectField,
  type Option,
} from "../../../shared/components/multiFieldSelect";
import type { createFormData } from "../../../features/add-group";
import { MultiDaySelector } from "../../../shared/components/multi-days-select";
import { searchStudents } from "../../../shared/api/endpoints";

interface FormProps {
  register: UseFormRegister<createFormData>;
  errors: FieldErrors<createFormData>;
  control: Control<createFormData>;
  aviableStudents?: Option[] | undefined;
}

export function Form({
  register,
  errors,
  control,
  aviableStudents,
}: FormProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="English Advanced"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Teacher */}
          <div>
            <label
              htmlFor="teacher"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="teacher"
                {...register("teacher")}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.teacher ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="John Davis"
              />
            </div>
            {errors.teacher && (
              <p className="mt-1 text-sm text-red-600">
                {errors.teacher?.message}
              </p>
            )}
          </div>
          {/* Schedule */}
          <div>
            <label
              htmlFor="schedule"
              className="block text-sm font-medium text-gray-700"
            >
              Schedule Time *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="schedule"
                {...register("schedule.time")}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.schedule?.time ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="8:00 PM"
              />
            </div>

            {errors.schedule?.time && (
              <p className="mt-1 text-sm text-red-600">
                {errors.schedule.time.message}
              </p>
            )}
          </div>
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300
                rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="archived">Inactive</option>
            </select>
          </div>
          {/* Monthly Fee */}
          <div>
            <label
              htmlFor="monthlyFee"
              className="block text-sm font-medium text-gray-700"
            >
              Monthly Fee *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSignIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="monthlyFee"
                {...register("price", { valueAsNumber: true })}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.price ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="120"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>
          {/* Room */}
          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700"
            >
              Room
            </label>
            <input
              type="text"
              id="location"
              {...register("room")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Room 101"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <label
          htmlFor="schedule"
          className="text-lg font-medium text-gray-900 mb-6"
        >
          Schedule Days
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Controller
            name="schedule.days"
            control={control}
            render={({ field }) => (
              <MultiDaySelector value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>
      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Describe the group, its goals, and content..."
        />
      </div>
      {/* Students Section - Only visible when editing */}
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Current Students */}
        <MultiSelectField
          control={control}
          name="students"
          label="Students"
          initialGroup={aviableStudents}
          fetchOptions={searchStudents}
        />
      </div>
    </>
  );
}
