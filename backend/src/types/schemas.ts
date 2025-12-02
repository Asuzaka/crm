import { Types, Document } from "mongoose";

export type role = "owner" | "manager";
export type status = "active" | "blocked";
export type grade = 1 | 2 | 3 | 4 | 5;
export type action = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "OTHER";

export interface permission {
  access: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface Permissions {
  students: permission;
  users: permission;
  dashboard: permission;
  expences: permission;
  income: permission;
  groups: permission;
  history: permission;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: role;
  groups: Types.ObjectId[];
  permissions: Permissions;
  lastLogin: Date;
  passwordChangedAt: Date;
  confirmPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  groups: Types.ObjectId[];
  phone: string;
  guardian: string;
  guardianPhone: string;
  birthDate: Date;
  adress: string;
  status: status;
  notes?: string;
  coins: number;
  lastLogin?: Date;
  passwordChangedAt?: Date;
  confirmPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
  schedule: { day: string; time: string }[];
  // course: Types.ObjectId;
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
  manager?: Types.ObjectId;
  vendorName?: string;
  paymentMethod: "cash" | "bank" | "card" | "other";
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
