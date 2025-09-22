export interface IExpense {
  description: string;
  amount: number;
  currency: string;
  category: string;
  recipientType: "Manager/Staff" | "External Vendor";
  manager?: string; // only if Manager/Staff
  vendorName?: string; // only if External Vendor
  date: Date;
  paymentMethod: "cash" | "bank" | "card" | "Other";
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense extends IExpense {
  _id: string;
}
