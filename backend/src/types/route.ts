import { Request } from "express";
import { IUser } from "./schemas";

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
