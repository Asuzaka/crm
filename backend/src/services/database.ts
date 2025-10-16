import mongoose from "mongoose";
import { config } from "../constants/config";
/**
 * Connects to a Database
 * logs sucess if the connection is estabilished
 */
export async function connectDatabase() {
  const databaseURL: string = config.DATABASE.replace("<PASSWORD>", config.DATABASE_PASSWORD);

  try {
    await mongoose.connect(databaseURL, { dbName: "CRM" });
    console.log("Succesfully connected to Database");
  } catch {
    console.log("Failed to connect to Database");
    process.exit(1);
  }
}
