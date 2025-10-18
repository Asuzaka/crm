import { useForm } from "react-hook-form";
import { StudentCreateSchema, useCreateStudent, type StudentCreateSchemaType } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentForm } from "../../../widgets/student-form";
import { Button } from "../../../shared/components/button";

export function CreateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentCreateSchemaType>({
    resolver: zodResolver(StudentCreateSchema),
    defaultValues: {
      groups: [],
    },
  });

  const { mutate, isPending } = useCreateStudent();

  const Submit = (data: StudentCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <StudentForm register={register} errors={errors} control={control} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Creating Student Account...">
          Create Student Account
        </Button>
      </div>
    </form>
  );
}
