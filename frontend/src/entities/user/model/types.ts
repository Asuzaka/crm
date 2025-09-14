export type role = "owner" | "manager";

export interface Permissions {
  addStudents : boolean,
  deleteStudents : boolean,
  addPayments : boolean,
}


export interface User extends IUser {
  id: string;
}

export interface IUser {
  email : string;
  name : string;
  role : role;
  responsible : string[];
  permissions : Permissions;
  lastLogin : Date;
  createdAt : Date;
  updatedAt : Date;
  passwordChangedAt : Date;
}
