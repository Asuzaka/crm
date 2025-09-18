export interface IPayment {
  group: string;
  amount: number;
  student: string;
  createdBy: string;
  createdAt: Date;
  method: "cash" | "card";
}

export interface Payment extends IPayment {
  _id: string;
}
