import type { getStudentType } from "../../../shared/api/types/students";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { mapStudent, useUpdateStudent, type StudentUpdateSchemaType } from "..";
import { StudentCreateSchema, type StudentCreateSchemaType } from "../../add-student";
import { StudentForm } from "../../../widgets/student-form";
import { Button } from "../../../shared/components/button";

export function UpdateForm({ data, id }: { id: string; data: getStudentType }) {
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

    if (!Object.keys(patchData).length) return;

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <StudentForm register={register} errors={errors} control={control} groups={data.data.groups} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Updating Student...">
          Updating Manager
        </Button>
      </div>
    </form>
  );
}
