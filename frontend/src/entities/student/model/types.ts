export type status = "active" | "archived";

export interface IStudent {
  name: string;
  groups: { _id: string; name: string }[];
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

export interface Student extends IStudent {
  _id: string;
}
