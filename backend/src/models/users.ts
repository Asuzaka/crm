import { IUser, permission, Permissions } from "../types/schemas";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const permissionSchema: Schema<permission> = new Schema(
  {
    access: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
  { _id: false }
);

const PermissionsSchema: Schema<Permissions> = new Schema(
  {
    students: permissionSchema,
    users: permissionSchema,
    dashboard: permissionSchema,
    expences: permissionSchema,
    income: permissionSchema,
    groups: permissionSchema,
    history: permissionSchema,
  },
  { _id: false }
);

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
    groups: [
      {
        type: Schema.ObjectId,
        ref: "Group",
      },
    ],
    permissions: PermissionsSchema,
    lastLogin: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("activity", {
  ref: "Record",
  localField: "_id",
  foreignField: "user",
  count: true,
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

// Pre-save hook for password to save as crypted
UserSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

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

UserSchema.methods.confirmPassword = async function (candidate: string, password: string) {
  return await bcrypt.compare(candidate, password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
