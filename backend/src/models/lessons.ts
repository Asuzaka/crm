import { model, Schema } from "mongoose";
import { ILesson } from "../types/schemas";


const lessonsSchema = new Schema<ILesson>({
  teacher: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  group: {
    type: Schema.ObjectId,
    ref: "Group",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [{student: Schema.ObjectId, present: Boolean, grade: Number,}]
}, {timestamps: true})

export const Lesson = model<ILesson>("Lesson", lessonsSchema)
