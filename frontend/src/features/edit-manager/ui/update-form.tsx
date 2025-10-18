import type { getUserType } from "../../../shared/api/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../widgets/manager-form";
import { UserCreateSchema, type UserCreateSchemaType } from "../../add-manager";
import { mapUser, type UserUpdateSchemaType, useUpdateUser } from "..";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { Button } from "../../../shared/components/button";

export function UpdateForm({ data, id }: { id: string; data: getUserType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: data.data ? mapUser(data) : { responsible: [], role: "manager" },
  });

  const { isPending, mutate } = useUpdateUser(id);

  const Submit = (data: UserUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    if (!Object.keys(patchData).length) return;

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form register={register} errors={errors} control={control} groups={data.data.responsible} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Updating User Account...">
          Update Manager Account
        </Button>
      </div>
    </form>
  );
}
