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
  activity: number;
}

export type UserForName = Pick<User, "name" | "_id" | "email">;

export interface GetUser extends Omit<User, "responsible"> {
  responsible: { _id: string; name: string }[];
}

export interface UsersAsList
  extends Pick<
    User,
    "name" | "email" | "permissions" | "lastLogin" | "_id" | "activity"
  > {
  responsible: { _id: string; name: string }[];
}
