import type { Payment } from "../../../entities/payment";

export interface PaymentsResponse {
  status: string;
  data: Payment[];
  results: number;
  documents: number;
  pages: number;
}

export interface PaymentResponse {
  status: string;
  data: Payment;
}
