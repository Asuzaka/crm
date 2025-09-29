import type { IncomeCreateSchemaType } from "../../../features/add-income";
import type { IncomeUpdateSchemaType } from "../../../features/edit-income";
import type { PaymentResponse, PaymentsResponse } from "../types/payment";
import { client } from "../client";

export function getPayments(page: number, limit: number, query: string) {
  return client<PaymentsResponse>(
    `/v1/payments?page=${page}&limit=${limit}${query}`,
    { method: "GET" }
  );
}
export function getPaymentsGroup(id: string) {
  return client<PaymentsResponse>(`/v1/payments/s/${id}`, { method: "GET" });
}
export function getPayment(id: string) {
  return client<PaymentResponse>(`/v1/payments/${id}`, { method: "GET" });
}

export function createPayment(body: IncomeCreateSchemaType) {
  return client<PaymentResponse>(`/v1/payments`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updatePayment(id: string, body: IncomeUpdateSchemaType) {
  return client<PaymentResponse>(`/v1/payments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deletePayments(id: string[]) {
  return client(`/v1/payments`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
