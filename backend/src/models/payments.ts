import { model, Schema } from "mongoose";
import { IPayment } from "../types/schemas";
import { Counter } from "./counter";


const paymentsSchema = new Schema<IPayment>({
  group: {
    type: Schema.ObjectId,
    ref: "Group",
  },
  student: {
    type: Schema.ObjectId,
    ref: "Student",
  },
  receiptNumber: { type: String, unique: true, required: true },
  createdBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  method: {
    type: String,
    enum: ["cash", "card", "bank"],
    required: true,
  }, 
  amount: {
    type: Number,
    required: true,
  },
}, {timestamps: true}) 

paymentsSchema.pre("save", async function (next) {
  if (!this.receiptNumber) {
    const counter = await Counter.findOneAndUpdate(
      { name: "paymentReceipt" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.receiptNumber = `R-${counter.seq.toString().padStart(6, "0")}`;
  }
  next();
});

export const Payment = model<IPayment>("Payment", paymentsSchema);
