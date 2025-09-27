export interface Payment {
  _id: string;
  group: { _id: string; name: string };
  amount: number;
  student: { _id: string; name: string };
  receiptNumber: string;
  createdBy: string;
  createdAt: Date;
  method: "cash" | "card" | "bank";
  notes?: string;
}
