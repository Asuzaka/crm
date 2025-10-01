import type { Expense } from "../../../entities/expense";

export interface getExpensesType {
  data: Expense[];
  status: string;
  results: number;
  documents: number;
  pages: number;
}

export interface getExpenseType {
  data: Expense;
  status: string;
}
