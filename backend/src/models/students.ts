import { model, Schema } from "mongoose";
import { IStudent } from "../types/schemas";

const studentsSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: Number,
    additionalNumber: Number,
    fathersName: String,
    fathersNumber: Number,
    mothersName: String,
    mothersNumber: Number,
    birthDate: {
      type: Date,
      required: true,
    },
    adress: String,
    groups: [
      {
        type: Schema.ObjectId,
        ref: "Group",
      },
    ],
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    notes: String,
    coins: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", studentsSchema);
