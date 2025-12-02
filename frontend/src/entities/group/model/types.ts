export type status = "active" | "paused" | "archived";

export interface Group {
  _id: string;
  name: string;
  teacher: { _id: string; name: string };
  students: { _id: string; name: string }[];
  schedule: { days: string[]; time: string };
  start: Date;
  description: string;
  room: string;
  price: number;
  history: { pause: Date; end: Date }[];
  status: status;
}

// API
import type { ExtendedApiType, StandardApiType } from "../../../shared/api/types";

export interface getGroupsType extends ExtendedApiType {
  data: Group[];
}

export interface getGroupType extends StandardApiType {
  data: Group;
}
