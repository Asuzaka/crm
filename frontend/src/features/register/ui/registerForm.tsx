import { useForm, Controller } from "react-hook-form";
import {
  type RegisterFormData,
  registerSchema,
  useRegister,
  useGroupOptions,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { responsible: [], role: "manager" },
  });
  const { mutate, isPending } = useRegister();
  const { data: availableGroups, isLoading } = useGroupOptions();
  console.log(errors);

  const Submit = (data: RegisterFormData) => {
    console.log("i am alive");
    mutate(data, {
      onSuccess: () => toast.success("User Created!"),
      onError: (err) => toast.error(err.message),
    });
  };

  if (isLoading) return <p> Loading... </p>;

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
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
        <Controller
          control={control}
          name="responsible"
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableGroups?.data.map((group) => {
                const isChecked = field.value?.includes(group.id);
                return (
                  <div
                    key={group.id}
                    className={`p-3 rounded-md border cursor-pointer ${
                      isChecked
                        ? "bg-blue-50 border-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      field.onChange(
                        isChecked
                          ? field.value?.filter((id) => id !== group.id)
                          : [...(field.value || []), group.id]
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
                              ? field.value?.filter((id) => id !== group.id)
                              : [...(field.value || []), group.id]
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
        {errors.responsible && (
          <p className="text-red-500 text-sm">
            {errors.responsible.message as string}
          </p>
        )}
      </div>
      <input type="hidden" {...register("role")} value="manager" />

      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Creating Manager Account..." : "Create Manager Account"}
        </button>
      </div>
    </form>
  );
}
