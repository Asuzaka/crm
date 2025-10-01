import type { ActivityRecord } from "../../../entities/record";

export interface getRecordsType {
  status: string;
  data: ActivityRecord[];
  results: number;
  documents: number;
  pages: number;
}

export interface getRecordType {
  statis: string;
  data: ActivityRecord;
}
