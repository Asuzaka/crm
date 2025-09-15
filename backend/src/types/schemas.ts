import { Types } from "mongoose";

export type role = "owner" | "manager";
export type status = "active" | "archived";
export type grade = 1 | 2 | 3 | 4 | 5;

export interface IPermissions {
  addStudents: boolean;
  deleteStudents: boolean;
  addPayments: boolean;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: role;
  responsible: Types.ObjectId[];
  permissions: IPermissions;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date;
  confirmPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  name: string;
  groups: Types.ObjectId[];
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

export interface IGroup extends Document {
  name: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
  schedule: { day: string; time: string }[];
  start: Date;
  room: string;
  price: number;
  histroy: { start: Date; end: Date }[];
  status: "active" | "pause" | "archived";
}

export interface ILesson extends Document {
  group: Types.ObjectId;
  teacher: Types.ObjectId;
  date: Date;
  students: {
    student: Types.ObjectId;
    present: boolean;
    grade?: number;
    // comment?: string;
  }[];
}

export interface IPayment extends Document {
  group: Types.ObjectId;
  amount: number;
  student: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  method: "cash" | "card";
}
