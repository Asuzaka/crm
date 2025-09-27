import { client } from "../client";
import type { createExpenseFormData } from "../../../features/add-expense";
import type { getExpenses, getExpense } from "../types";
import type { ExpenseUpdateSchemaType } from "../../../features/edit-expense";

export function getExpenses(page: number, limit: number, query: string) {
  return client<getExpenses>(
    `/v1/expenses?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getExpense(id: string) {
  return client<getExpense>(`/v1/expenses/${id}`, { method: "GET" });
}

export function createExpense(body: createExpenseFormData) {
  return client<getExpense>("/v1/expenses", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateExpense(id: string, body: ExpenseUpdateSchemaType) {
  return client<getExpense>(`/v1/expenses/${id}`, {
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
