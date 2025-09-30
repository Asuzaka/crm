import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupForm } from "../../../widgets/group-form";
import {
  GroupCreateSchema,
  useCreateGroup,
  type GroupCreateSchemaType,
} from "..";

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
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Creating  Group..." : "Create Group"}
        </button>
      </div>
    </form>
  );
}
