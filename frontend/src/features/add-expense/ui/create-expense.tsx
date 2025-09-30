import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseCreateSchema, type ExpenseCreateSchemaType } from "..";
import { useCreateExpense } from "../hooks/use-create-expense";
import { ExpenseForm } from "../../../widgets/expense-form";

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
      <ExpenseForm
        register={register}
        errors={errors}
        control={control}
        model={true}
      />
      {/* --- Submit --- */}
      <div className="flex justify-end space-x-3 py-3">
        <button
          onClick={onCloseModal}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className=" px-4 py-2 border border-transparent rounded-md text-sm font-medium  bg-blue-600 hover:bg-blue-700  text-white  disabled:opacity-70"
        >
          {isPending ? "Creating  Expense..." : "Create Expense"}
        </button>
      </div>
    </form>
  );
}
