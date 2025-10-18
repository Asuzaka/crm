import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseCreateSchema, type ExpenseCreateSchemaType } from "..";
import { useCreateExpense } from "../hooks/use-create-expense";
import { ExpenseForm } from "../../../widgets/expense-form";
import { Button } from "../../../shared/components/button";

export function CreateForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExpenseCreateSchemaType>({
    resolver: zodResolver(ExpenseCreateSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useCreateExpense();

  const Submit = (data: ExpenseCreateSchemaType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="p-6">
      <ExpenseForm register={register} errors={errors} control={control} model={true} />
      {/* --- Submit --- */}
      <div className="flex justify-end space-x-3 py-3">
        <Button variant="outline" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" full loading={isPending} loadingText="Creating  Expense...">
          Create Expense
        </Button>
      </div>
    </form>
  );
}
