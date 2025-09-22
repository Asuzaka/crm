import type { Expense } from "../../../entities/expense";

export interface getExpenses {
  data: Expense[];
  status: string;
  results: number;
  documents: number;
  pages: number;
}

export interface getExpense {
  data: Expense;
  status: string;
}
