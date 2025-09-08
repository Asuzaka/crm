import { model, Schema } from "mongoose";
import { IPayment } from "../types/schemas";


const paymentsSchema = new Schema<IPayment>({
  group: {
    type: Schema.ObjectId,
    ref: "Group",
  },
  student: {
    type: Schema.ObjectId,
    ref: "Student",
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
}, {timestamps: true}) 


export const Payment = model<IPayment>("Payment", paymentsSchema);
