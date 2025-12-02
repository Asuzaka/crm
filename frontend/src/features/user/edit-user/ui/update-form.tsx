import type { getUserType } from "../../../../entities/user";
import { mapUser, type UserUpdateSchemaType } from "..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "../../../../entities/user/hooks/use-update-user";
import { getDirtyValues } from "../../../../shared/lib/get-dirty-values";
import { Form } from "./form";
import { updateSchema } from "../model/schema";
import { Button } from "@/shared/ui";

export function EditForm({ data, id }: { id: string; data: getUserType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: data.data ? mapUser(data) : {},
  });

  const { isPending, mutate } = useUpdateUser(id);

  const Submit = (data: UserUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    if (!Object.keys(patchData).length) return;

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form register={register} errors={errors} control={control} groups={data.data.groups} />
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Editing User...">
          Edit User
        </Button>
      </div>
    </form>
  );
}
