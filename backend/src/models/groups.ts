import { model, Schema } from "mongoose";
import { IGroup } from "../types/schemas";

const groupsSchema = new Schema<IGroup>({
  name : {
    type: String,
    required: true,
  },
  teacher: {
    type: Schema.ObjectId,
    ref: "User",
  },
  students: [{type: Schema.ObjectId, ref: "Student"}],
  schedule: [{day: String, time: String}],
  start: Date,
  room: String,
  price: Number,
  histroy: [{start: Date, end: Date}],
  status: {
    type: String,
    enum: ["active", "pasued", "archived"],
  }
  
}, {timestamps: true})


export const Group = model<IGroup>("Group", groupsSchema);  
