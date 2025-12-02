import { model, Schema } from "mongoose";
import { IStudent } from "../types/schemas";
import bcrypt from "bcrypt";

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    phone: String,
    guardian: String,
    guardianPhone: String,
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
      enum: ["active", "blocked"],
      default: "active",
    },
    notes: String,
    coins: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Pre-save hook for password to save as crypted
studentSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Auto
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // in times timing can be a problem so safely would we minusing a second
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

studentSchema.methods.confirmPassword = async function (candidate: string, password: string) {
  return await bcrypt.compare(candidate, password);
};

export const Student = model<IStudent>("Student", studentSchema);
