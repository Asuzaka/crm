import type { ExpenseUpdateSchemaType } from "../../../features/edit-expense";
import type { getExpensesType, getExpenseType } from "../types/expense";
import type { ExpenseCreateSchemaType } from "../../../features/add-expense";
import { client } from "../client";

export function getExpenses(page: number, limit: number, query: string) {
  return client<getExpensesType>(
    `/v1/expenses?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getExpense(id: string) {
  return client<getExpenseType>(`/v1/expenses/${id}`, { method: "GET" });
}

export function createExpense(body: ExpenseCreateSchemaType) {
  return client<getExpenseType>("/v1/expenses", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateExpense(id: string, body: ExpenseUpdateSchemaType) {
  return client<getExpenseType>(`/v1/expenses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteExpenses(id: string[]) {
  return client(`/v1/expenses`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
