export interface Payment {
  _id: string;
  group: string;
  amount: number;
  student: string;
  receiptNumber: string;
  createdBy: string;
  createdAt: Date;
  method: "cash" | "card" | "bank";
  notes?: string;
}
