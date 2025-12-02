import mongoose from "mongoose";
import { config } from "../constants/config";
/**
 * Connects to a Database
 * logs sucess if the connection is estabilished
 */
export async function connectDatabase() {
  const databaseURL: string = config.DATABASE.replace("<PASSWORD>", config.DATABASE_PASSWORD);

  try {
    await mongoose.connect(databaseURL, { dbName: "CRM", serverSelectionTimeoutMS: 5000 });
    console.log("Succesfully connected to Database");
  } catch (error) {
    console.log("Failed to connect to Database", error);
    process.exit(1);
  }
}
