import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapExpense, useExpenseUpdate, type ExpenseUpdateSchemaType } from "..";
import { ExpenseCreateSchema, type ExpenseCreateSchemaType } from "../../add-expense";
import type { getExpenseType } from "@/entities/expense";
import { getDirtyValues } from "@/shared/lib/get-dirty-values";
import { ExpenseForm } from "@/widgets/expense/expense-form";
import { Button } from "@/shared/ui";

export function UpdateForm({ data, id }: { id: string; data: getExpenseType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ExpenseCreateSchemaType>({
    resolver: zodResolver(ExpenseCreateSchema),
    defaultValues: data.data ? mapExpense(data) : {},
  });

  const { isPending, mutate } = useExpenseUpdate(id);

  const Submit = (data: ExpenseUpdateSchemaType) => {
    const patchData = getDirtyValues(dirtyFields, data);

    if (!Object.keys(patchData).length) return;

    mutate(patchData);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <ExpenseForm register={register} errors={errors} control={control} aviable={data.data.manager} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <Button
          variant="primary"
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Updating Expense..." : "Updating Expense"}
        </Button>
      </div>
    </form>
  );
}
