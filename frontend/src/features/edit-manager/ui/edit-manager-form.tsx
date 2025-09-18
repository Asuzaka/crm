import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form } from "../../../widgets/manager-form";
import { registerSchema, type RegisterFormData } from "../../add-manager";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useGetUser } from "../hooks/useGetUser";
import { mapUserResponse } from "../util/normalize-object";

export function UpdateForm({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetUser(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: data?.data
      ? mapUserResponse(data)
      : { responsible: [], role: "manager" },
  });

  const { isPending, mutate } = useUpdateUser(id);

  if (isLoading || !data) return <p>Loading...</p>;

  if (isError) return <p>Error happened...</p>;

  const Submit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: () => toast.success("User Updated"),
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form
        register={register}
        errors={errors}
        control={control}
        availableGroups={data.data.responsible}
      />
      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending
            ? "Updating Manager Account..."
            : "Updating Manager Account"}
        </button>
      </div>
    </form>
  );
}
