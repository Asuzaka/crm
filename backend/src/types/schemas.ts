import { Types } from "mongoose";

export type role = "owner" | "manager";
export type status = "active" | "archived";
export type grade = 1 | 2 | 3 | 4 | 5;
export type action = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "OTHER";

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
  confirmPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
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
  _id: Types.ObjectId;
  name: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
  schedule: { day: string; time: string }[];
  description: string;
  start: Date;
  room: string;
  price: number;
  histroy: { start: Date; end: Date }[];
  status: "active" | "pause" | "archived";
}

export interface ILesson extends Document {
  _id: Types.ObjectId;
  group: Types.ObjectId;
  teacher: Types.ObjectId;
  date: string;
  students: {
    student: Types.ObjectId;
    present: boolean;
    grade?: number;
    // comment?: string;
  }[];
}

export interface IPayment extends Document {
  _id: Types.ObjectId;
  group: Types.ObjectId;
  amount: number;
  student: Types.ObjectId;
  receiptNumber: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  method: "cash" | "card" | "bank";
  notes?: string;
}

export interface IExpense extends Document {
  _id: Types.ObjectId;
  description: string;
  amount: number;
  currency: string;
  category: string;
  recipientType: "Manager/Staff" | "External Vendor";
  manager?: Types.ObjectId; // only if Manager/Staff
  vendorName?: string; // only if External Vendor
  paymentMethod: "cash" | "bank" | "card" | "Other";
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecord extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  actionType: action;
  entityType: string;
  entityId: Types.ObjectId;
  description: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICounter extends Document {
  _id: Types.ObjectId;
  name: string;
  seq: number;
}
