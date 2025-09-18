import { client } from "../client"
import type { PaymentResponse, PaymentsResponse } from "../types/payment"

export function getPaymentsGroup(id:string){
  return client<PaymentsResponse>(`/v1/payments/s/${id}`, {method: "GET"})
}
export function getPayment(id:string){
  return client<PaymentResponse>(`/v1/payments/${id}`, {method: "GET"}) 
}
export function updatePayment(id:string, body:unknown){
  return client<PaymentResponse>(`/v1/payments/${id}`, {method: "PATCH", body: JSON.stringify(body)})
}
export function deletePayments(id:string[]){
  return client(`/v1/payments`, {method: "DELETE", body: JSON.stringify({id})})
}
export function getPayments(){
  return client<PaymentsResponse>("/v1/payments", {method: "GET"})
}
