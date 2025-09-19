export type role = "owner" | "manager";

export interface Permissions {
  addStudents: boolean;
  deleteStudents: boolean;
  addPayments: boolean;
}

export interface User extends IUser {
  _id: string;
}

export interface IUser {
  email: string;
  name: string;
  role: role;
  responsible: string[];
  permissions: Permissions;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date;
}

export interface GetUser extends Omit<User, "responsible"> {
  responsible: { _id: string; name: string }[];
}

export interface UsersAsList
  extends Pick<User, "name" | "email" | "permissions" | "lastLogin" | "_id"> {
  responsible: { _id: string; name: string }[];
}
