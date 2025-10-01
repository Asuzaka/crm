import type { Payment } from "../../../entities/income";

export interface getPaymentsType {
  status: string;
  data: Payment[];
  results: number;
  documents: number;
  pages: number;
}

export interface getPaymentType {
  status: string;
  data: Payment;
}
