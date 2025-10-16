import { app } from "./app";
import { connectDatabase } from "./services/database";
import { config } from "./constants/config";
import { initOwner } from "./startup/initOwner";

async function StartServer() {
  connectDatabase();
  await initOwner();

  app.listen(config.PORT, () => {
    console.log("Server is started on localhost:8080");
  });
}

StartServer();
