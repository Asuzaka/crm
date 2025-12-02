import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupCreateSchema, type GroupCreateSchemaType } from "../../add-group";
import { useGroupUpdate } from "../hooks/use-group-update";
import { mapGroup, type GroupUpdateSchemaType } from "..";
import type { getGroupType } from "@/entities/group";
import { getDirtyValues } from "@/shared/lib/get-dirty-values";
import { GroupForm } from "@/widgets/group";
import { Button } from "@/shared/ui";

export function UpdateForm({ data, id }: { id: string; data: getGroupType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<GroupCreateSchemaType>({
    resolver: zodResolver(GroupCreateSchema),
    defaultValues: data.data
      ? mapGroup(data)
      : {
          students: [],
          status: "active",
          schedule: { days: [] },
          start: new Date(),
        },
  });

  const { isPending, mutate } = useGroupUpdate(id);

  const Submit = (data: GroupUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    if (!Object.keys(patchData).length) return;

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <GroupForm
        aviableStudents={data.data.students}
        register={register}
        errors={errors}
        control={control}
        aviable={data.data.teacher}
      />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Updating Group...">
          Update Group
        </Button>
      </div>
    </form>
  );
}
