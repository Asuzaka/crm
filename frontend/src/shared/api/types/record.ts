import type { ActivityRecord } from "../../../entities/record";

export interface getRecordsResponse {
  status: string;
  data: ActivityRecord[];
}

export interface getRecordResponse {
  statis: string;
  data: ActivityRecord;
}
