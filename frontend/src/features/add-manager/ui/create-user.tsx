import { useForm } from "react-hook-form";
import { type UserCreateSchemaType, UserCreateSchema, useCreateUser } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../widgets/manager-form";
import { Button } from "../../../shared/components/button";

export function CreateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: { responsible: [], role: "manager" },
  });

  const { mutate, isPending } = useCreateUser();

  const Submit = (data: UserCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form register={register} errors={errors} control={control} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Creating User Account...">
          Create User Account
        </Button>
      </div>
    </form>
  );
}
