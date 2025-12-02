export type status = "active" | "blocked";

export interface Student {
  _id: string;
  name: string;
  email: string;
  groups: { _id: string; name: string }[];
  phone: string;
  guardian: string;
  guardianPhone: string;
  birthDate: Date;
  adress: string;
  status: status;
  lastLogin?: Date;
  notes?: string;
  coins: number;
}

// API
import type { ExtendedApiType, StandardApiType } from "@/shared/api/types";

export interface getStudentsType extends ExtendedApiType {
  data: Student[];
}

export interface getStudentType extends StandardApiType {
  data: Student;
}
