import type { getExpense } from "../../../shared/api/types";
import type { ExpenseCreateSchemaType } from "../../add-expense";

export function mapExpense(data: getExpense): ExpenseCreateSchemaType {
  return {
    ...data.data,
    manager: data.data.manager?._id,
  };
}
