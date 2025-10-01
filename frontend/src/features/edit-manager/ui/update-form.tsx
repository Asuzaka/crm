import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../widgets/manager-form";
import { UserCreateSchema, type UserCreateSchemaType } from "../../add-manager";
import { mapUser, type UserUpdateSchemaType, useUpdateUser } from "..";
import type { getUserType } from "../../../shared/api/types/user";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";

export function UpdateForm({ data, id }: { id: string; data: getUserType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: data.data
      ? mapUser(data)
      : { responsible: [], role: "manager" },
  });

  const { isPending, mutate } = useUpdateUser(id);

  const Submit = (data: UserUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData);
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
