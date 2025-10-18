import { useForm } from "react-hook-form";
import { IncomeCreateSchema, useCreateIncome, type IncomeCreateSchemaType } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { IncomeForm } from "../../../widgets/income-form";
import { Button } from "../../../shared/components/button";

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
        <Button type="submit" full loading={isPending} loadingText="Creating Payment...">
          Create Payment
        </Button>
      </div>
    </form>
  );
}
