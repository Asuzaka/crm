import { useUpdateStudent, type getStudentType } from "@/entities/student";
import { mapStudent, type StudentUpdateSchemaType } from "..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDirtyValues } from "@/shared/lib/get-dirty-values";
import { updateSchema } from "../model/schema";
import { StudentForm } from "./form";
import { Button } from "@/shared/ui";

export function UpdateForm({ data, id }: { id: string; data: getStudentType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<StudentUpdateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: data.data ? mapStudent(data) : {},
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
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Updating Student...">
          Edit Student
        </Button>
      </div>
    </form>
  );
}
