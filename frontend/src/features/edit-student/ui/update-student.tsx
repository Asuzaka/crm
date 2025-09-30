import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { mapStudent, useUpdateStudent, type StudentUpdateSchemaType } from "..";
import type { StudentGetResponse } from "../../../shared/api/types";
import {
  StudentCreateSchema,
  type StudentCreateSchemaType,
} from "../../add-student";
import { StudentForm } from "../../../widgets/student-form";

export function UpdateForm({
  data,
  id,
}: {
  id: string;
  data: StudentGetResponse;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<StudentCreateSchemaType>({
    resolver: zodResolver(StudentCreateSchema),
    defaultValues: data.data ? mapStudent(data) : { groups: [] },
  });

  const { isPending, mutate } = useUpdateStudent(id);

  const Submit = (data: StudentUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <StudentForm
        register={register}
        errors={errors}
        control={control}
        groups={data.data.groups}
      />
      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Updating Student..." : "Updating Manager"}
        </button>
      </div>
    </form>
  );
}
