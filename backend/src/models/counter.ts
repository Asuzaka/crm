import mongoose, { Schema } from "mongoose";
import { ICounter } from "../types/schemas";


const counterSchema = new Schema<ICounter>({
  name: { type: String, required: true, unique: true }, // identifier for what we're counting
  seq: { type: Number, default: 0 }, // the current sequence number
});

export const Counter = mongoose.model<ICounter>("Counter", counterSchema);
