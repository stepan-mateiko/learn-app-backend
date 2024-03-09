import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import { connectToDatabase } from "./db/db.js";

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3080;
async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
export { app };
