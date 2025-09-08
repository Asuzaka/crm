import { app } from "./app";
import { connectDatabase } from "./services/database";
import { config } from "./constants/config";

connectDatabase();

app.listen(config.PORT, () =>
  console.log("Server is started on localhost:8080")
);
