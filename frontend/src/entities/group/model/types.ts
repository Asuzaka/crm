export type status = "active" | "pause" | "archived";

export interface IGroup {
  name : string;
  teacher: string;
  stundets: string[];
  schedule: {day: string; time: string;}[]
  start: Date;
  room: string;
  price: number;
  history: {pause : Date, end: Date}[];
  status: status;
}

export interface Group extends IGroup {
  _id: string;
}

export type GroupOption = Pick<Group, "_id" | "name">;
