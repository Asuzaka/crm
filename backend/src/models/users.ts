import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/schemas";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    role: {
      type: String,
      enum: ["owner", "manager"],
      default: "manager",
    },
    responsible: [
      {
        type: Schema.ObjectId,
        ref: "Group",
      },
    ],
    permissions: {
      addPayments: {
        type: Boolean,
        default: false,
      },
      addStudents: {
        type: Boolean,
        default: false,
      },
      deleteStudents: {
        type: Boolean,
        default: false,
      },
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
UserSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified()) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Auto
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // in times timing can be a problem so safely would we minusing a second
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

UserSchema.methods.confirmPassword = async function (
  candidate: string,
  password: string
) {
  return await bcrypt.compare(candidate, password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
