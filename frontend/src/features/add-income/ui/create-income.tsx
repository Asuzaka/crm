import { useForm } from "react-hook-form";
import {
  IncomeCreateSchema,
  useCreateIncome,
  type IncomeCreateSchemaType,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { IncomeForm } from "../../../widgets/income-form";

export function CreateIncome() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IncomeCreateSchemaType>({
    resolver: zodResolver(IncomeCreateSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useCreateIncome();

  const Submit = (data: IncomeCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <IncomeForm register={register} errors={errors} control={control} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Creating Payment..." : "Create Payment"}
        </button>
      </div>
    </form>
  );
}
