import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { StudentCreateSchemaType } from "../../../features/add-student";
import { MultiFieldSelect, type SearchType } from "../../../shared/components/multi-field";
import { PhoneIcon, UserIcon } from "lucide-react";
import { searchGroups } from "../../../shared/api/endpoints/group";

interface FormProps {
  register: UseFormRegister<StudentCreateSchemaType>;
  errors: FieldErrors<StudentCreateSchemaType>;
  control: Control<StudentCreateSchemaType>;
  groups?: SearchType[];
}

export function Form({ register, errors, control, groups }: FormProps) {
  return (
    <>
      {/* General Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register("name")}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="John Smith"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.phoneNumber ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="(555) 123-4567"
              />
            </div>
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("birthDate")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              {...register("adress")}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>

          {/* Parent Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother’s Name</label>
            <input
              type="text"
              {...register("mothersName")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother’s Contact</label>
            <input
              type="tel"
              {...register("mothersNumber")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Father’s Name</label>
            <input
              type="text"
              {...register("fathersName")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Father’s Contact</label>
            <input
              type="tel"
              {...register("fathersNumber")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>
      </div>

      {/* Groups Field */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Groups</h2>
        <MultiFieldSelect
          control={control}
          name="groups"
          label="Groups"
          maxItems={5}
          fetchOptions={searchGroups}
          initialValues={groups}
        />
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h2>
        <textarea
          {...register("notes")}
          rows={3}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          placeholder="Add any additional information..."
        />
      </div>
    </>
  );
}
