import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { GroupCreateSchema, type GroupCreateSchemaType } from "../../add-group";
import { useGroupUpdate } from "../hooks/use-group-update";
import { GroupForm } from "../../../widgets/group-form";
import type { getGroupResponse } from "../../../shared/api/types/group";
import { mapGroup, type GroupUpdateSchemaType } from "..";

export function UpdateForm({
  data,
  id,
}: {
  id: string;
  data: getGroupResponse;
}) {
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
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Updating Group..." : "Updating Group"}
        </button>
      </div>
    </form>
  );
}
