export type category =
  | "Salaries"
  | "Equipment"
  | "Rent"
  | "Utilities"
  | "Marketing"
  | "Office Supplies"
  | "Software"
  | "Insurance"
  | "Taxes"
  | "Other";

export interface Expense {
  _id: string;
  description: string;
  amount: number;
  category: category;
  recipientType: "Manager/Staff" | "External Vendor";
  manager?: { _id: string; name: string };
  vendorName?: string;
  date: Date;
  paymentMethod: "cash" | "bank" | "card" | "other";
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// API
import type { ExtendedApiType, StandardApiType } from "../../../shared/api/types";

export interface getExpensesType extends ExtendedApiType {
  data: Expense[];
}

export interface getExpenseType extends StandardApiType {
  data: Expense;
}
