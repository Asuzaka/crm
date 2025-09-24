export type status = "active" | "pause" | "archived";

export interface IGroup {
  name: string;
  teacher: string;
  students: { _id: string; name: string }[];
  schedule: { day: string; time: string }[];
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

export type GroupOption = Pick<Group, "_id" | "name">;
