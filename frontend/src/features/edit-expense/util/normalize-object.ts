import type { getExpense } from "../../../shared/api/types";
import type { createExpenseFormData } from "../../add-expense";

export function maExpenseResponse(data: getExpense): createExpenseFormData {
  return {
    ...data.data,
    manager: data.data.manager?._id,
  };
}
