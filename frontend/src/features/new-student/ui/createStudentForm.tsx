import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, useCreateStudent, type StudentFormData } from "..";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGroupOptions } from "../../register";

export function CreateStudentForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const { isPending, mutate } = useCreateStudent();
  const { data: availableGroups, isLoading } = useGroupOptions();

  const onSubmit = (data: StudentFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Student created!");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl w-full max-h-full overflow-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Create Student</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded border p-2"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Groups */}
        <Controller
          control={control}
          name="groups"
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableGroups?.data.map((group) => {
                const isChecked = field.value.includes(group._id);
                return (
                  <div
                    key={group._id}
                    className={`p-3 rounded-md border cursor-pointer ${
                      isChecked
                        ? "bg-blue-50 border-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      field.onChange(
                        isChecked
                          ? field.value.filter((_id) => _id !== group._id)
                          : [...field.value, group._id]
                      )
                    }
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          field.onChange(
                            isChecked
                              ? field.value.filter((_id) => _id !== group._id)
                              : [...field.value, group._id]
                          )
                        }
                        className="h-4 w-4"
                      />
                      <span className="ml-2">{group.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        />

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="mt-1 block w-full rounded border p-2"
            placeholder="Enter digits only"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Additional Number */}
        <div>
          <label className="block text-sm font-medium">Additional Number</label>
          <input
            type="text"
            {...register("additionalNumber")}
            className="mt-1 block w-full rounded border p-2"
            placeholder="Enter digits only"
          />
          {errors.additionalNumber && (
            <p className="text-red-600 text-sm">
              {errors.additionalNumber.message}
            </p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium">Father's Name</label>
          <input
            {...register("fathersName")}
            className="mt-1 block w-full rounded border p-2"
          />
          {errors.fathersName && (
            <p className="text-red-600 text-sm">{errors.fathersName.message}</p>
          )}
        </div>

        {/* Father's Number */}
        <div>
          <label className="block text-sm font-medium">Father's Number</label>
          <input
            type="text"
            {...register("fathersNumber")}
            className="mt-1 block w-full rounded border p-2"
            placeholder="Enter digits only"
          />
          {errors.fathersNumber && (
            <p className="text-red-600 text-sm">
              {errors.fathersNumber.message}
            </p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium">Mother's Name</label>
          <input
            {...register("mothersName")}
            className="mt-1 block w-full rounded border p-2"
          />
          {errors.mothersName && (
            <p className="text-red-600 text-sm">{errors.mothersName.message}</p>
          )}
        </div>

        {/* Mother's Number */}
        <div>
          <label className="block text-sm font-medium">Mother's Number</label>
          <input
            type="text"
            {...register("mothersNumber")}
            className="mt-1 block w-full rounded border p-2"
            placeholder="Enter digits only"
          />
          {errors.mothersNumber && (
            <p className="text-red-600 text-sm">
              {errors.mothersNumber.message}
            </p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium">Birth Date</label>
          <input
            type="date"
            {...register("birthDate")}
            className="mt-1 block w-full rounded border p-2"
          />
          {errors.birthDate && (
            <p className="text-red-600 text-sm">{errors.birthDate.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            {...register("adress")}
            className="mt-1 block w-full rounded border p-2"
          />
          {errors.adress && (
            <p className="text-red-600 text-sm">{errors.adress.message}</p>
          )}
        </div>

        {/* Notes (span both columns on desktop) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            {...register("notes")}
            className="mt-1 block w-full rounded border p-2"
          />
        </div>

        {/* Submit Button (span both columns) */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
