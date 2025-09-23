import { client } from "../client";
import type { getRecordResponse, getRecordsResponse } from "../types";

export function getRecords(page: number, limit: number, query: string) {
  return client<getRecordsResponse>(
    `/v1/records?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getRecord(id: string) {
  return client<getRecordResponse>(`/v1/records/${id}`, { method: "GET" });
}
