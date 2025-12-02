export interface Payment {
  _id: string;
  group: { _id: string; name: string } | null;
  amount: number;
  student: { _id: string; name: string };
  receiptNumber: string;
  createdBy: string;
  createdAt: Date;
  method: "cash" | "card" | "bank";
  notes?: string;
}

// API
import type { ExtendedApiType, StandardApiType } from "../../../shared/api/types";

export interface getPaymentsType extends ExtendedApiType {
  data: Payment[];
}

export interface getPaymentType extends StandardApiType {
  data: Payment;
}
