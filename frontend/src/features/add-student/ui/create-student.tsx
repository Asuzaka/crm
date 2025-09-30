import { useForm } from "react-hook-form";
import {
  StudentCreateSchema,
  useCreateStudent,
  type StudentCreateSchemaType,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentForm } from "../../../widgets/student-form";

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
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Creating Student Account..." : "Create Student Account"}
        </button>
      </div>
    </form>
  );
}
