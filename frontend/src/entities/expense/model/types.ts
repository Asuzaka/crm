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

export interface IExpense {
  description: string;
  amount: number;
  currency: string;
  category: category;
  recipientType: "Manager/Staff" | "External Vendor";
  manager?: { _id: string; name: string }; // only if Manager/Staff
  vendorName?: string; // only if External Vendor
  date: Date;
  paymentMethod: "cash" | "bank" | "card" | "other";
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense extends IExpense {
  _id: string;
}
