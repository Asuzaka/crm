import type { getPaymentType } from "../../../shared/api/types/payment";
import { IncomeCreateSchema, type IncomeCreateSchemaType } from "../../add-income";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateIncome } from "../hooks/use-update-income";
import { mapPaymentResponse } from "..";
import { IncomeForm } from "../../../widgets/income-form";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { Button } from "../../../shared/components/button";

export function Update({ id, data }: { id: string; data: getPaymentType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<IncomeCreateSchemaType>({
    resolver: zodResolver(IncomeCreateSchema),
    defaultValues: data.data ? mapPaymentResponse(data) : {},
  });

  const { mutate, isPending } = useUpdateIncome(id);

  const Submit = (data: IncomeCreateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <IncomeForm
        register={register}
        errors={errors}
        control={control}
        student={data.data.student}
        group={data.data.group}
        disabled={true}
      />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button full type="submit" loading={isPending} loadingText="Updating Payment...">
          Update Payment
        </Button>
      </div>
    </form>
  );
}
