export type status = "active" | "paused" | "archived";

export interface IGroup {
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

export interface Group extends IGroup {
  _id: string;
}
