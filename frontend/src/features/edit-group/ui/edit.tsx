import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { queryClient } from "../../../shared/api/queryClient";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import type { getGroupResponse } from "../../../shared/api/types/group";
import { createSchema, type createFormData } from "../../add-group";
import { mapGroupResponse } from "../util/normalize-object";
import { useGroupUpdate } from "../hooks/useGroupUpdate";
import { GroupForm } from "../../../widgets/group-form";

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
  } = useForm<createFormData>({
    resolver: zodResolver(createSchema),
    defaultValues: data.data
      ? mapGroupResponse(data)
      : {
          students: [],
          status: "active",
          schedule: { days: [] },
          start: new Date(),
        },
  });

  const { isPending, mutate } = useGroupUpdate(id);

  const Submit = (data: createFormData) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData, {
      onSuccess: () => {
        toast.success("Group Updated");
        queryClient.invalidateQueries({ queryKey: ["group", id] });
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  console.log(data.data);

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
