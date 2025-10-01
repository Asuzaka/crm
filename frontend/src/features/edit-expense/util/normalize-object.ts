import type { getExpenseType } from "../../../shared/api/types/expense";
import type { ExpenseCreateSchemaType } from "../../add-expense";

export function mapExpense(data: getExpenseType): ExpenseCreateSchemaType {
  return {
    ...data.data,
    manager: data.data.manager?._id,
  };
}
