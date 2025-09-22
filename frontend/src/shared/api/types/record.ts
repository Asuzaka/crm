import type { ActivityRecord } from "../../../entities/record";

export interface getRecordsResponse {
  status: string;
  data: ActivityRecord[];
  results: number;
  documents: number;
  pages: number;
}

export interface getRecordResponse {
  statis: string;
  data: ActivityRecord;
}
