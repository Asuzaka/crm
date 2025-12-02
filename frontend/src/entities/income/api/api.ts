import type { getPaymentsType, getPaymentType } from "../model/types";
import { client } from "../../../shared/api/client";
import type { IncomeCreateSchemaType, IncomeUpdateSchemaType } from "@/features/income";

export function getPayments(page: number, limit: number, query: string) {
  return client<getPaymentsType>(`/v1/payments?page=${page}&limit=${limit}${query}`, { method: "GET" });
}
export function getPaymentsGroup(id: string) {
  return client<getPaymentType>(`/v1/payments/s/${id}`, { method: "GET" });
}
export function getPayment(id: string) {
  return client<getPaymentType>(`/v1/payments/${id}`, { method: "GET" });
}

export function createPayment(body: IncomeCreateSchemaType) {
  return client<getPaymentType>(`/v1/payments`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updatePayment(id: string, body: IncomeUpdateSchemaType) {
  return client<getPaymentType>(`/v1/payments/${id}`, {
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
