import { client } from "../client";
import type { getExpenses, getExpense } from "../types";

export function getExpenses(page: number, limit: number) {
  return client<getExpenses>(`/v1/expenses?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

export function getExpense(id: string) {
  return client<getExpense>(`/v1/expenses/${id}`, { method: "GET" });
}
