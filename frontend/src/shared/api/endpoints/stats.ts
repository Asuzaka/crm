import { client } from "../client";
import type {
  getStatsOfMethodsType,
  getStatsOfMoneyType,
  getStatsType,
} from "../types/stats";

export function getStatsOfMoney() {
  return client<getStatsOfMoneyType>(`/v1/stats/money`, { method: "GET" });
}

export function getStatsOfMethods() {
  return client<getStatsOfMethodsType>(`/v1/stats/methods`, { method: "GET" });
}

export function getStats() {
  return client<getStatsType>(`/v1/stats`, { method: "GET" });
}
