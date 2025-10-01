import type { getRecordsType, getRecordType } from "../types/record";
import { client } from "../client";

export function getRecords(page: number, limit: number, query: string) {
  return client<getRecordsType>(
    `/v1/records?page=${page}&limit=${limit}${query}`,
    {
      method: "GET",
    }
  );
}

export function getRecordsOfUser(id: string) {
  return client<getRecordsType>(`/v1/records/user/${id}`, {
    method: "GET",
  });
}

export function getRecord(id: string) {
  return client<getRecordType>(`/v1/records/${id}`, { method: "GET" });
}
