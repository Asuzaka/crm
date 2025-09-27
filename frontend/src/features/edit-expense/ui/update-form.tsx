import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { queryClient } from "../../../shared/api/queryClient";
import { getDirtyValues } from "../../../shared/lib/get-dirty-values";
import { maExpenseResponse } from "../util/normalize-object";
import { useExpenseUpdate } from "..";
import type { getExpense } from "../../../shared/api/types";
import {
  createExpenseSchema,
  type createExpenseFormData,
} from "../../add-expense";
import { ExpenseForm } from "../../../widgets/expense-form";

export function UpdateForm({ data, id }: { id: string; data: getExpense }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<createExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: data.data ? maExpenseResponse(data) : {},
  });

  const { isPending, mutate } = useExpenseUpdate(id);

  const Submit = (data: createExpenseFormData) => {
    const patchData = getDirtyValues(dirtyFields, data);

    mutate(patchData, {
      onSuccess: () => {
        toast.success("Expense Updated");
        queryClient.invalidateQueries({ queryKey: ["expense", id] });
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <ExpenseForm
        register={register}
        errors={errors}
        control={control}
        aviable={data.data.manager}
      />
      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Updating Expense..." : "Updating Expense"}
        </button>
      </div>
    </form>
  );
}
