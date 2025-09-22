import  { model, Schema, Types } from "mongoose";
import { IExpense } from "../types/schemas";



const ExpenseSchema = new Schema<IExpense>(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "UZS" },
    category: { type: String, required: true },

    recipientType: {
      type: String,
      enum: ["Manager/Staff", "External Vendor"],
      required: true,
    },

    manager: {
      type: Types.ObjectId,
      ref: "User", // or "Manager"
      required: function () {
        return this.recipientType === "Manager/Staff";
      },
    },

    vendorName: {
      type: String,
      trim: true,
      required: function () {
        return this.recipientType === "External Vendor";
      },
    },

    date: { type: Date, required: true },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Card", "Other"],
      required: true,
    },

    notes: { type: String, trim: true },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);

export const Expense = model<IExpense>("Expense", ExpenseSchema);
