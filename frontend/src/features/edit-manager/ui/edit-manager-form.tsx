import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form } from "../../../widgets/manager-form";
import { registerSchema, type RegisterFormData } from "../../add-manager";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { mapUserResponse } from "../util/normalize-object";
import type { UserGetResponse } from "../../../shared/api/types";
import { queryClient } from "../../../shared/api/queryClient";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";

export function UpdateForm({
  data,
  id,
}: {
  id: string;
  data: UserGetResponse;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: data.data
      ? mapUserResponse(data)
      : { responsible: [], role: "manager" },
  });

  const { isPending, mutate } = useUpdateUser(id);

  const Submit = (data: RegisterFormData) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData, {
      onSuccess: () => {
        toast.success("User Updated");
        queryClient.invalidateQueries({ queryKey: ["user", id] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
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
