import { UserCreateSchema, type UserCreateSchemaType } from "..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "../../../../entities/user/hooks/use-create-user";
import { Form } from "./form";
import { Button } from "@/shared/ui";

export function Add() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(UserCreateSchema),
  });

  const { mutate, isPending } = useCreateUser();

  const Submit = (data: UserCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form register={register} errors={errors} control={control} />
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Creating User...">
          Add User
        </Button>
      </div>
    </form>
  );
}
