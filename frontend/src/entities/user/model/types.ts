export type role = "owner" | "manager";

export interface Permissions {
  students: permission;
  users: permission;
  dashboard: permission;
  expences: permission;
  income: permission;
  groups: permission;
  history: permission;
}

export interface permission {
  access: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: role;
  groups: { _id: string; name: string }[];
  permissions: Permissions;
  passwordChangedAt?: Date;
  lastLogin?: Date;
  activity?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserForName = Pick<User, "name" | "_id" | "email">;

// API
import type { ExtendedApiType, StandardApiType } from "../../../shared/api/types";

export interface getUserType extends StandardApiType {
  data: User;
}

export interface getUsersType extends ExtendedApiType {
  data: User[];
}
