import { useForm } from "react-hook-form";
import { StudentCreateSchema, type StudentCreateSchemaType } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStudent } from "@/entities/student";
import { Button } from "@/shared/ui";
import { StudentForm } from "./form";

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
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Creating Student...">
          Add Student
        </Button>
      </div>
    </form>
  );
}
