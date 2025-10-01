import type { UserForName } from "../../user";

export type action =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "OTHER";

export interface ActivityRecord {
  _id: string;
  user: UserForName;
  actionType: action;
  entityType: string;
  entityId: string;
  description: string;
  metadata: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}
