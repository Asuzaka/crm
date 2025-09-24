import { model, Schema } from "mongoose";
import { IGroup } from "../types/schemas";

const groupsSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.ObjectId,
      ref: "User",
    },
    schedule: [{ day: String, time: String }],
    start: Date,
    description: String,
    room: String,
    price: Number,
    histroy: [{ start: Date, end: Date }],
    status: {
      type: String,
      enum: ["active", "paused", "archived"],
    },
  },
  { timestamps: true }
);

groupsSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "groups",
});

groupsSchema.set("toJSON", { virtuals: true });
groupsSchema.set("toObject", { virtuals: true });

export const Group = model<IGroup>("Group", groupsSchema);
