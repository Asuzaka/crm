import mongoose from "mongoose";
import { config } from "../constants/config";
/**
 * Connects to a Database
 * logs sucess if the connection is estabilished
 */
export function connectDatabase() {
  const databaseURL: string = config.DATABASE.replace("<PASSWORD>", config.DATABASE_PASSWORD);
  mongoose.connect(databaseURL, { dbName: "CRM" }).then((_) => {
    console.log("Succesfully connected to Database");
  });
}
