import { model, Schema } from "mongoose";
import { IRecord } from "../types/schemas";


const recordSchema = new Schema<IRecord>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionType: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "ADD_PAYMENT",
        "ADD_EXPENSE",
        "CREATE_GROUP",
        "LOGIN",
        "LOGOUT",
        "OTHER",
      ],
      required: true,
    },
    entityType: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId },
    description: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true })

 export const Record = model("Record", recordSchema);
