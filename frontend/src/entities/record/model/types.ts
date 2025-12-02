import type { UserForName } from "../../user";

export type action = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "OTHER";

export interface ActivityRecord {
  _id: string;
  user: UserForName;
  actionType: action;
  entityType: string;
  entityId: string;
  description: string;
  metadata: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// API
import type { ExtendedApiType, StandardApiType } from "../../../shared/api/types";

export interface getRecordsType extends ExtendedApiType {
  data: ActivityRecord[];
}

export interface getRecordType extends StandardApiType {
  data: ActivityRecord;
}
