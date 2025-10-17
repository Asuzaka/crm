import { GroupCreateSchema, useCreateGroup, type GroupCreateSchemaType } from "..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupForm } from "../../../widgets/group-form";
import { Button } from "../../../shared/components/button";

export function CreateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GroupCreateSchemaType>({
    resolver: zodResolver(GroupCreateSchema),
    defaultValues: {
      students: [],
      status: "active",
      schedule: { days: [] },
      start: new Date(),
    },
  });

  const { mutate, isPending } = useCreateGroup();

  const Submit = (data: GroupCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <GroupForm register={register} errors={errors} control={control} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Creating  Group...">
          Create Group
        </Button>
      </div>
    </form>
  );
}
