import { useForm } from "react-hook-form";
import { IncomeCreateSchema, type IncomeCreateSchemaType } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { IncomeForm } from "./form";
import { Button } from "@/shared/ui";
import { useCreateIncome } from "@/entities/income";

export function AddIncome() {
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
      <div className="pt-4">
        <Button type="submit" full loading={isPending} loadingText="Adding Payment...">
          Add Payment
        </Button>
      </div>
    </form>
  );
}
