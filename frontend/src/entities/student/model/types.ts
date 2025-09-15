import type { Group } from "../../group";

export type status = "active" | "archived";

export interface IStudent {
  name: string;
  groups: string[];
  phoneNumber: string;
  additionalNumber: string;
  fathersName: string;
  fathersNumber: string;
  mothersName: string;
  mothersNumber: string;
  birthDate: Date;
  adress: string;
  status: status;
  notes: string;
  coins: number;
}

export interface Student extends IStudent {
  _id: string;
}

export type GroupForStudentList = Pick<Group, "_id" | "name">;

export interface StudentList
  extends Pick<
    Student,
    "_id" | "name" | "phoneNumber" | "additionalNumber" | "status"
  > {
  groups: GroupForStudentList[];
}

export interface CreateStudent
  extends Omit<
    IStudent,
    | "coins"
    | "status"
    | "additionalNumber"
    | "notes"
    | "mothersNumber"
    | "fathersNumber"
  > {
  additionalNumber?: string;
  notes?: string;
  mothersNumber?: string;
  fathersNumber?: string;
}
